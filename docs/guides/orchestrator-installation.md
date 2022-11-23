---
title: Install Metrist Orchestrator
---

# {{ $frontmatter.title }}

1. To install Orchestrator the easy way, run this command and follow the prompts. You will, for example, need your API token which you can get from [app.metrist.io/profile](https://app.metrist.io/profile).

	```sh
	curl https://dist.metrist.io/install.sh >/tmp/install.sh; bash /tmp/install.sh
	```

	If you are running on a platform that the script supports, you will have a running copy of Orchestrator.

	::: tip

	`journalctl --unit metrist-orchestrator` should show a running process.

	`sudo systemctl stop metrist-orchestrator` will stop the process.

	`sudo systemctl start metrist-orchestrator` will start the process.
	:::

1. Also, if logged in at [app.metrist.io](https://app.metrist.io/), you can:

	- Add the Metrist monitor to your dashboard (click “+ Add/Remove dependencies”),
	- then navigate to the Metrist monitor > Realtime Data > “My Agent Data”.

	Your Orchestrator is reporting telemetry data to a region called `fake-dev-instance` (this is configurable, see below).

	![Metrist monitor telemetry example](/images/fake-dev-instance-monitor-running.png)

::: info
We do not support every combination of operating system and (in Linux’ case) distribution. If the script detects that your system is not supported for guided installation, it will refer you back here. Please see the rest of the document for more installation options. These options are also a good starting point for unattended installations.
:::

::: info
The shell command above will fail in a VM running in WSL (Windows Subsystem for Linux). We recommend Windows users skip to the section below about [Docker installation](#docker-installation).
:::

## Verification of Binaries

All binaries are signed by a key that is listed in our [public keyring](https://github.com/Metrist-Software/orchestrator/blob/dist/trustedkeys.gpg?raw=true). This means that you can fetch our keyring:

```sh
wget -O /tmp/metrist.gpg https://github.com/Metrist-Software/orchestrator/blob/dist/trustedkeys.gpg?raw=true
```

and use the verification commands listed with the download commands in the rest of this document.

## API Token

You will need your API key to run Metrist Orchestrator, which you can get from https://app.metrist.io/profile. Scripts below expect to find it in the environment:

```sh
export METRIST_API_TOKEN=<your key here>
```

## Docker Installation

We distribute a Docker image for Orchestrator. You can get the image name from our distribution site:

```sh
latest=$(curl https://dist.metrist.io/orchestrator/docker/orchestrator-latest.txt)
docker run <run-args...> $latest
```

`run-args` depends on what you want to do with Orchestrator. In the simplest case, for only running private synthetic monitoring, you just need to add an API token using `-e METRIST_API_TOKEN=<your key>`. If you want to export Orchestrator's listening port for in-process monitoring, you should add `-p 51712:51712/udp`. With both, for example:

```sh
docker run -e METRIST_API_TOKEN=$METRIST_API_TOKEN -p 51712:51712/udp $latest
```

## Debian Package Installation

Systems supported:

* Ubuntu for x86, 64 bit: 20.04, 22.04

If you are on a supported system for Debian package installation, you can simply download the package:

```sh
sudo apt install -y wget gpg curl
orch_latest=$(curl https://dist.metrist.io/orchestrator/ubuntu/20.04.x86_64.latest.txt)
wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest
wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest.asc
gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc
```

(Where "20.04" is replaced by the distribution you are using.)

Installation then proceeds by installing the package:

```sh
sudo apt install -y ./$orch_latest
```

And adding your API key:

```sh
cat <<EOF | sudo tee -a /etc/default/metrist-orchestrator
METRIST_API_TOKEN=$METRIST_API_TOKEN
EOF
```

You can then proceed to start the software using systemd:

```sh
sudo systemctl enable --now metrist-orchestrator
sudo systemctl start metrist-orchestrator
```

A quick `journalctl --unit metrist-orchestrator` should show a running program.

### Unsupported Platforms with Debian Package Format

Note that the above Debian package _should_ work for Ubuntu/Debian-like platforms that have the same C libraries as the supported Ubuntu versions (like actual Debian distributions and non-LTS Ubuntu versions). We do not support this, however. Please contact us if you want your system added to the list.

## Amazon Linux Package Installation

Systems supported:

* Amazon Linux 2

You can simply download the package:

```sh
sudo yum install wget curl
orch_latest=$(curl https://dist.metrist.io/orchestrator/amazon-linux/2.x86_64.latest.txt)
wget https://dist.metrist.io/orchestrator/amazon-linux/$orch_latest
```

### (Optional) Verifying the Package

Amazon Linux 2 includes a gpg version < 2.1 so verification would have to be done outside the Amazon Linux 2 machine using a gpg version >= 2.1 to support the Keybox keyring format of our trustedkeys.gpg.

```sh
orch_latest=$(curl https://dist.metrist.io/orchestrator/amazon-linux/2.x86_64.latest.txt)
wget https://dist.metrist.io/orchestrator/amazon-linux/$orch_latest
wget https://dist.metrist.io/orchestrator/amazon-linux/$orch_latest.asc
gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc
```

Installation then proceeds by installing the package:

```sh
sudo yum localinstall ./$orch_latest
```

And add your API key:

```sh
cat <<EOF | sudo tee -a /etc/default/metrist-orchestrator
METRIST_API_TOKEN=$METRIST_API_TOKEN
EOF
```

You can then proceed to start the software using systemd:

```sh
sudo systemctl enable --now metrist-orchestrator
sudo systemctl start metrist-orchestrator
```

A quick `journalctl --unit metrist-orchestrator` should show a running program.

## Installation From Source <Badge type="warning" text="experimental" />

Installation from source is simplest using [asdf-vm](https://asdf-vm.com/). Just fetch the source code from Git, install dependencies using `asdf`, and build:

```sh
git clone git@github.com:Metrist-Software/orchestrator.git
cd orchestrator
asdf install
export MIX_ENV=prod
mix do deps.get, compile, release
```

This will create an executable `_build/prod/rel/bakeware/orchestrator` that you can then directly run (assuming that you have set the API key as above).

### Without asdf

If you do not or can not use asdf-vm, please check the `.tool-versions` file for dependencies. You will, at a minimum, need current versions of Erlang and Elixir.
