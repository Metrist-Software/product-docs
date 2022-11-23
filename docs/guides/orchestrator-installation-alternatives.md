---
title: More Ways to Install Metrist Orchestrator
---

# {{ $frontmatter.title }}

## Installation Options

We support the systems outlined below (unless otherwise marked “experimental”).

If your preferred system is not yet supported, please [contact us](mailto:support@metrist.io?subject=Please%20support%20my%20preferred%20OS).

## Getting Ready

### Verification of Binaries

<!--@include: /parts/verification-of-binaries.md-->

### API Token

You will need your API auth token to run Metrist Orchestrator. You can find your API token at [app.metrist.io/profile](https://app.metrist.io/profile). The scripts below expect to find it in the environment:

```sh
export METRIST_API_TOKEN=<your API auth token here>

#confirm it is available in the environment
echo $METRIST_API_TOKEN
```

## Docker Installation

We distribute a Docker image for Orchestrator. You can get the image name from our distribution site:

```sh
latest=$(curl https://dist.metrist.io/orchestrator/docker/orchestrator-latest.txt)
docker run <run-args...> $latest
```

`run-args` depends on what you want to do with Orchestrator. In the simplest case, for running private synthetic monitoring, you just need to add an API token using `-e METRIST_API_TOKEN=<your key>`. If you want to export Orchestrator’s listening port for in-process monitoring, you should add `-p 51712:51712/udp`.

Example with both arguments:

```sh
docker run -e METRIST_API_TOKEN=$METRIST_API_TOKEN -p 51712:51712/udp $latest
```
::: details WSL (Windows Subsystem for Linux) <Badge type="warning" text="experimental" />
Metrist Orchestrator cannot be run in a Linux WSL virtual machine without modification. (See [this post](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/) about making _systemd_ available in WSL.)

In theory, Metrist Orchestrator can be installed and run in a Docker container in a WSL virtual machine.

We don’t support these options. However, please [contact us](mailto:support@metrist.io) if you experiment and have success with either of these approaches in a Windows environment.
:::


## Debian Package Installation

::: tip SYSTEMS SUPPORTED
* Ubuntu for x86, 64 bit: 20.04, 22.04
:::

If you are on a supported system for Debian package installation, you can:

1. Download the package:

	```sh
	sudo apt install -y wget gpg curl
	orch_latest=$(curl https://dist.metrist.io/orchestrator/ubuntu/20.04.x86_64.latest.txt)
	wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest
	wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest.asc
	gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc
	```

	::: info
	(Where "20.04" is replaced by the distribution you are using.)
	:::

1. Then install the package:

	```sh
	sudo apt install -y ./$orch_latest
	```

1. And add your API key:

	```sh
	cat <<EOF | sudo tee -a /etc/default/metrist-orchestrator
	METRIST_API_TOKEN=$METRIST_API_TOKEN
	EOF
	```

1. You can then start the software using systemd:

	```sh
	sudo systemctl enable --now metrist-orchestrator
	sudo systemctl start metrist-orchestrator
	```
<!--@include: /parts/systemctl-process-tips(indented).md-->

### Unsupported Platforms with Debian Package Format <Badge type="warning" text="experimental" />

Note the above Debian package _should_ work for Ubuntu/Debian-like platforms that have the same C libraries as the supported Ubuntu versions (like actual Debian distributions and non-LTS Ubuntu versions)(but not Raspbian or other debian distributions for ARM64 systems). Please [contact us](mailto:support@metrist.io) if you want your system added to the list.

## Amazon Linux Package Installation

::: tip SYSTEMS SUPPORTED
* Amazon Linux 2
:::

1. Download the package:

	```sh
	sudo yum install wget curl
	orch_latest=$(curl https://dist.metrist.io/orchestrator/amazon-linux/2.x86_64.latest.txt)
	wget https://dist.metrist.io/orchestrator/amazon-linux/$orch_latest
	```

1. (Optional) Verify the Package

	Amazon Linux 2 includes a gpg version < 2.1 so verification must be done outside the Amazon Linux 2 machine using a gpg version >= 2.1 to support the Keybox keyring format of our trustedkeys.gpg.

	```sh
	orch_latest=$(curl https://dist.metrist.io/orchestrator/amazon-linux/2.x86_64.latest.txt)
	wget https://dist.metrist.io/orchestrator/amazon-linux/$orch_latest
	wget https://dist.metrist.io/orchestrator/amazon-linux/$orch_latest.asc
	gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc
	```

1. Then install the package:

	```sh
	sudo yum localinstall ./$orch_latest
	```

1. And add your API key:

	```sh
	cat <<EOF | sudo tee -a /etc/default/metrist-orchestrator
	METRIST_API_TOKEN=$METRIST_API_TOKEN
	EOF
	```

1. You can then start the software using systemd:

	```sh
	sudo systemctl enable --now metrist-orchestrator
	sudo systemctl start metrist-orchestrator
	```

<!--@include: /parts/systemctl-process-tips(indented).md-->

## Installation From Source <Badge type="warning" text="experimental" />

We recommend using [asdf-vm](https://asdf-vm.com/) to install dependencies, but it’s not necessary.

::: details Without asdf
If you do not or can not use asdf-vm, please check the [.tool-versions](https://github.com/Metrist-Software/orchestrator/blob/main/.tool-versions) file for dependencies. At a minimum, you will need current versions of Erlang and Elixir.
:::

1. Fetch the source code from Git, install dependencies (using `asdf` as below), and build:

	```sh
	git clone git@github.com:Metrist-Software/orchestrator.git
	cd orchestrator
	asdf install
	export MIX_ENV=prod
	mix do deps.get, compile, release
	```

	This will create an executable `_build/prod/rel/bakeware/orchestrator` that you can then directly run.

	```sh
	_build/prod/rel/bakeware/orchestrator run
	```

