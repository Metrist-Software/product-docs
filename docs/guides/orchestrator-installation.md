---
title: Install Metrist Orchestrator
---

# {{ $frontmatter.title }}

## Guided Installation

1. To start a guided installation of Orchestrator, run this command and follow the prompts. You will, for example, need your API token which you can get from [app.metrist.io/profile](https://app.metrist.io/profile).

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

	- Add the Metrist monitor to your dashboard (click _+ Add/Remove dependencies_),
	- select the Metrist monitor for display on your dashboard,
	- _Save Changes_,
	- then navigate to the _Metrist_ monitor > _Realtime Data_ > _My Agent Data_.

	You should see your Orchestrator reporting telemetry data to a region called `fake-dev-instance` (this is configurable, see below).

	![Metrist monitor telemetry example](/images/fake-dev-instance-monitor-running.png)

::: info
We do not support every combination/distribution of operating system. If the script detects that your system is not supported for guided installation, it will refer you back here.

Please see [other installation options](/guides/orchestrator-installation-alternatives). These options are a good starting point for unattended installations, docker environments, etc.
:::

## Verification of Binaries

<!--@include: /parts/verification-of-binaries.md-->

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
