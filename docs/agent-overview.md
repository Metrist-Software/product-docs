# General Documentation

## Overview

This document explains how the various parts of Metrist's offering fit together, especially
the shared code that is run on-premises.

## Terminology

* *On-premises*, or "on-prem", designates code that runs on customer owned or operated infrastructure
  and under a customer's control. While "on-prem" classically meant "at customer owned sites" like
  offices, factories and warehouses, we include any cloud infrastructure and co-location sites as well.
* *Shared code* is the code that Metrist shares with customers under NDA. We share this
  code so that customers can verify the safety of our code, create their own builds, and make their
  own extensions. All code that Metrist expects customers to run on-premises is shared.
* *Metrist back-end* is the term we will use for systems that are operated by Metrist on
  its infrastructure.
* *Monitor* is a process that actively assesses the availability and performance of an API, usually a
  vendor's API.
* *Synthetic monitor* is a monitor that uses "fake" data to talk to the vendor API.
* *Production monitor* is a monitor that uses real production traffic to assess the availability
  and performance of an API. A production monitor typically observes production software to gather
  API performance data, currently typically done by in-process monitoring.
* *Shared monitors* are synthetic monitors that Metrist continuously runs on its own infrastructure,
  generating data that can be used by all customers.
* *Private monitors* are monitors that are operated, using Metrist-supplied software, by customers on their own
  infrastructure. Typically, private monitors use service-specific credentials for the APIs monitored that are
  managed by the customer.
* *Metrist Orchestrator* is software that customers run on-premises to execute private monitors.
  The agent is also responsible for supporting in-process monitoring by collecting and pre-processing data
  sent to it by in-process monitoring.
* *In-process monitoring* is the act of intercepting API calls in production systems. Software that
  runs "inside" the production code's processes sniffs out API calls and forwards them to the monitoring
  agent. The monitoring agent has logic to decide whether the intercepted API call has data that contributes
  to the assessment of a production monitor.

## Metrist Orchestrator

Metrist Orchestrator is the cornerstone of our on-premises offering. Orchestrator has two main functions:

* To schedule and run private synthetic monitors. This is very much alike to how monitors are scheduled
  and run on the Metrist back-end, but with a different, customer-specific configuration.
* To receive data from in-process monitoring. The in-process part of this system is intentionally kept
  as simple as possible, to minimize the overhead and risk associated with "intruding" on production
  code. The monitoring agent takes care of the heavy lifting here.

### Private synthetic monitoring

Using an API key, Metrist Orchestrator fetches customer-specific scheduling configuration
from the Metrist back-end and uses that to decide which synthetic monitors to run. This happens
roughly every ten seconds. For each monitor that is scheduled to run, Orchestrator will look at the last
time the monitor reported back (again fetching this from the Metrist back-end) and decide whether enough
time has elapsed to warrant a new run of the monitor. If this is true, then the monitor is run.
Measurements collected by the monitor are sent to the Metrist back-end for further analysis.

The goals of private synthetic monitoring are three-fold:

1. To provide insights how vendor APIs work from the customer's premises. The shared monitors run from
   a number of geographically distributed locations but these locations will not necessarily match where
   customer interactions with the vendor happens, and network issues often can result in highly local
   outages.
2. To provide insights how vendor APIs react on the customer's exact data. Shared monitors run with
   "dummy" data, often on vendor accounts dedicated to monitoring. It is very well possible that data sizes
   influence how a vendor API behaves, and as such using a production API key for monitoring may
   result in observing different behaviour. By employing private monitoring, control of production
   API keys and production data can stay where it should be: on-prem. Note that the monitor is still
   synthetic - it runs "fake" transactions - but it operates on "real" data, which can
   have a large performance impact.
3. To facilitate monitoring for vendor APIs that are not supported by Metrist. Using the
   shared source for Metrist Orchestrator, customers can build their own monitors and run them through the agent.

Metrist Orchestrator comes bundled with all monitors that Metrist supports for private monitoring. It
is the configuration document, however, that decides which monitors are run. By storing this configuration
document centrally, multiple instances of the customer agent can run with the same configuration. By
sending measurements back to the Metrist back-end, measurements can be aggregated, compared with
public measurements, and trigger notifications in the same way as notifications for shared monitors
are triggered.

<!-- TODO: links to installation, configuration, monitoring DSL -->

### In-process monitoring

For certain production processes, Metrist supplies "In-Process Agents" (IPAs) that intercept
outgoing API calls (or, more often, outgoing HTTP calls). How this happens is dependent on the actual
stack; two curent examples are:

* The Ruby-on-Rails IPA. Ruby has the concept of "monkey-patching" where new code can extend or override
  existing code. The agent overrides some code in `Net::HTTP`, the standard Ruby module for outgoing HTTP
  calls. It measures the timing of the request and sends some request data and timing off to Metrist Orchestrator for
  further processing.
* The PHP/Curl IPA. PHP code normally uses Curl to make outgoing HTTP calls. Curl is integrated in most,
  if not all, PHP distributions. Our IPA, which is currently Linux-specific, uses the Linux dynamic
  linker's audit facility to be informed of any Curl calls, takes timings of the request, and sends request
  data and timing off to Metrist Orchestrator for further processing.

More agents may follow, but they will all share the characteristics of the current agents:

* Minimal code and overhead. The agents run literally "inside" production systems and therefore their footprint
  should be as small as possible. Code should be as small as possible to make verification as easy as possible.
* Non-intrusive. We send the data to Metrist Orchestrator using UDP, which risks the loss of data but will make sure that
  the IPA never blocks or waits for the Orchestrator to be available. Whether the data arrives somewhere or not, the
  behaviour of the IPA code will not change.
* Maximize out-of-band processing. The IPA is a firehose that simply sends off data of _all_ intercepted calls to
  Metrist Orchestrator. Our Orchestrator can then take processing at leisure, sift out data it knows about, and convert it into
  a format that the Metrist back-end requires. The data can be queued and processed with arbitrary delays as long as it is properly timestamped when received.

Note that with this setup, customer-operated software is still in full control over what is sent to the Metrist back-end: while the IPA typically operates in "firehose" mode, observing and forwarding all outgoing API calls
to Metrist Orchestrator, it acts as a filter to send data that is clean, free of sensitive information, and
expected to be sent to the Metrist back-end.

#### IPA/Orchestrator protocol

Data flows from IPA to Orchestrator through UDP on port 51712 by default (this is configurable). As indicated above,
UDP was chosen because of the "fire-and-forget" characteristics of sending datagrams: there is no wait for
acknowledgement, not even a check whether there is actually a process to receive them, so no chance that the
sending process will block or otherwise delay. While data can be lost, we think it is a small consideration
in exchange for predictable performance of the IPA.

Again, to keep the IPA code simple, the format that is expected is very trivial. Currently two formats are
supported - the Ruby and PHP IPAs "see" differently-formatted data and rather than burdening them with parsing
or combining URL fragments, it is shipped "as is" to Metrist Orchestrator so that the IPA code can stay as simple as possible. This
trend may continue with more format variations to accomodate specific use cases.

An IPA message consists of fields, separated by tab characters (ASCII code 9) and terminated by line feeds (ASCII code 11). This
format is simple to construct, simple to parse, and human readable. The first field is always a version code, and it determines
the rest of the payload. The current variants are:

* Version "0": four fields containing the HTTP method, host, path and time (in fractional milliseconds);
* Version "1": three fields containing the HTTP method, URL, and time (in fractional milliseconds).
