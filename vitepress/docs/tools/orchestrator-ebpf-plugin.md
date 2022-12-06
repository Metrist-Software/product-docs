---
title: Orchestrator eBFP Plugin
---

# {{ $frontmatter.title }}

## Introduction

The Metrist Orchestrator eBPF Plugin uses the Linux kernel's [eBPF](https://ebpf.io/) functionality to help discover all
outgoing API calls. Any call that a monitored node makes is sent to the configured Orchestrator’s endpoint for
[In-process forwarding](/tools/orchestrator-source-code#in-process-forwarding) for further processing. Unknown API calls
will be logged (both by Orchestrator as well as by this plugin) and known API calls will be converted into
Service/check pairs and sent to the Metrist backend as regular monitoring metrics.

## Mechanism

The plugin contains and loads a couple of eBPF programs that will end up tracing all outgoing TLS/SSL calls. Anything
intercepted gets sent from the eBPF level (in the Linux kernel) to the userspace part of the code for further
processing. Because the plugin intercepts calls on the library level, it can look at data before it is encrypted and
thus figure out what the actual host, method and path are for an API call. This is impossible to do at, for example,
the networking level.

Once host, method and path are found for a call, the plugin forwards data to its configured Orchestrator. The latter
sees the data as regular "in-process agent" data and will therefore process it against its in-process configuration.

## Limitations

Plain HTTP traffic is ignored. Because, the sort of APIs we are interested in, in the context of Metrist’s vendor
management functionality, typically are not sent in the clear over the public internet.

At the moment, we only monitor traffic from software that uses the OpenSSL library and only if it has been dynamically
linked against it. We do not yet support other TLS libraries, like GNU TLS or BoringSSL; contact us if you need support
for these.

Certain languages do not use external dynamically linked libraries. Mainstream languages we are aware of that we can not
monitor this way:

* Languages on the JVM (Java, Scala, Clojure, Kotlin, etc). The JVM has a TLS implementation that is implemented in Java.
  So, we cannot hook into it through eBPF.
* Languages on the BEAM (Erlang, Elixir). Similarly, the BEAM has a TLS implementation implemented in Erlang.
* Golang. Golang delivers statically linked executables and thus does not give us the hooks we need to monitor it.

For all of these, you can still use the regular in-process monitoring. This does mean, however, that you lose the opportunity
of system-wide discovery.

## System requirements

The plugin requires a Linux kernel version 5.8 or later and will refuse to run on earlier kernels. eBPF is quite new
and still under heavy development and we need to use some newer features of the subsystem.

The plugin is distributed as a Linux package or a self-contained executable and does not require anything special to run. Memory
usage should be in the order of a handful of megabytes.

## Installation

We support Linux distributions as-needed. So, if you don't see yours and you want support with a platform-native installation
package, please let us know.

Our distribution packages are signed with PGP/GnuPG. We distribute a keyring file with [trusted keys](https://github.com/Metrist-Software/orchestrator/blob/dist/trustedkeys.gpg) you can install prior to downloading
so you can verify that the distribution packages were indeed built by us.

# Ubuntu 20.04

We distribute a package containing the executable and a simple systemd script for easy installation on Ubuntu 20.04. The following
steps will install the plugin with a default configuration (talking to an Orchestrator instance on localhost):

    cd /tmp # This is important other wise apt-get install will fail
    plugin_latest=$(curl http://dist.metrist.io/orchestrator-plugins/ebpf/ubuntu/20.04.x86_64.latest.txt)
    wget http://dist.metrist.io/orchestrator-plugins/ebpf/ubuntu/$plugin_latest
    wget http://dist.metrist.io/orchestrator-plugins/ebpf/ubuntu/$plugin_latest.asc
    gpg --verify $plugin_latest.asc
    apt-get install -y ./metrist*.deb

A standard environment file is in /etc/default/metrist-ebpf-agent and can be changed to point the plugin at
an Orchestrator running elsewhere:

    cat <<EOF >/etc/default/metrist-ebpf-agent
    METRIST_ORCHESTRATOR_ENDPOINT=<your_orchestrator_host>:51713
    EOF

When all is done, the standard systemd invocation will start the service:

    systemctl enable metrist-ebpf-agent
    systemctl start metrist-ebpf-agent

# Other systems

If your system has a young enough kernel version, you may install the executable by hand:

    latest=$(curl http://dist.metrist.io/orchestrator-plugins/ebpf/latest-x86_64.txt)
    wget http://dist.metrist.io/orchestrator-plugins/ebpf/$latest.tar.gz
    wget http://dist.metrist.io/orchestrator-plugins/ebpf/$latest.tar.gz.asc
    gpg --verify $latest.tar.gz.asc
    tar xvfz $latest.tar.gz

From there, you can run the resulting executable (`metrist-ebpf-agent`) from the command line or as a daemon
started by your system's supervisor. The only setting is the `METRIST_ORCHESTRATOR_ENDPOINT` environment variable.
