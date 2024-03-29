---
title: Metrist PHP/Curl In-Process Agent
---

# {{ $frontmatter.title }}

This directory contains the source code for the PHP/Curl In-Process Agent (IPA).

The goal of this agent is to hook into outgoing API calls and send them off to the local Metrist Orchestrator, which will sift through the data and send interesting items off
for analysis to the Metrist backend.

Installation is quite simple: build or obtain the binary package, and then make sure
that your PHP (or other software that uses libcurl in "easy" mode) process is loaded
with the environment variable `LD_AUDIT` pointing at this library's location. The
Linux loader will load it before other libraries (like libcurl) and in this way it is called first when Curl calls are made.

The library is thread-safe and should have negligible performance impact on your
application: no in-process processing is done, and data is forwarded to the host's
monitoring agent through UDP datagrams. This means that it'll never block.

## Building

You need the standard Unix toolchain (`make`, `gcc`) and the development version of
libcurl installed. On an Ubuntu machine, this is usually accomplished by invoking:

``` sh
sudo apt install build-essential libcurl4-openssl-dev
```

Invoking `make` will then build the library and run a test suite over the included
linked list library. The agent is now in your directory as a `.so` file.

## Configuration

Example: PHP 7.4 running with FPM behind Nginx under Systemd. Do:

```
sudo systemctl edit php7.4-fpm.service
```

and make sure that the configuration override contains:

``` sh
[Service]
Environment="LD_AUDIT=/opt/canary/libcanary_curl_ipa.so.0.1"
```

Then restart the service and auditing should commence. There are two more environment
variables you can use to change where the telemetry data is sent:

* `CANARY_MONITORING_AGENT_HOST` sets a IP4/6 address to which telemetry data is to be sent. The default
  is localhost. Note that due to limitations of what an audit library can do, the use of
  hostnames is currently not possible here.
* `CANARY_MONITORING_AGENT_PORT` sets a port through which telemetry data is to be sent. The default is port 51712.
