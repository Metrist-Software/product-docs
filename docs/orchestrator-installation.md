# Installing Metrist Orchestrator

## Guided installation

To install Orchestrator the easy way, simply run

    curl https://dist.metrist.io/install.sh >/tmp/install.sh; bash /tmp/install.sh

and follow the prompts. If you are running on a platform that the script support, you will end up with a running copy of
Orchestrator.

We do not support every combination of operating system and (in Linux' case) distribution. If the script detects that your
system is not supported for guided installation, it will refer you back here. Please see the rest of the document for
various levels of more manual installation options. These options are also a good starting point for unattended
installations.

## Verification of binaries

All binaries are signed by a key that is listed in our [public keyring](https://github.com/Metrist-Software/orchestrator/blob/main/dist/trustedkeys.gpg?raw=true). This means that
you can fetch our keyring:

    curl 'https://github.com/Metrist-Software/orchestrator/blob/main/dist/trustedkeys.gpg?raw=true' >/tmp/metrist.gpg

and use the verification commands listed with the download commands in the rest of this document.

## API key

You will need your API key to run Metrist Orchestrator, which you can get from https://app.metrist.io/profile. Scripts below
expect to find it in the environment:

    export METRIST_API_KEY=<your key here>

## Docker installation

We distribute a Docker image for Orchestrator. You can get the image name from our distribution site:

    latest=$(curl https://dist.metrist.io/orchestrator/docker/orchestrator-latest.txt)
    docker run <run-args...> $latest

`run-args` depends on what you want to do with Orchestrator. In the simplest case, for only running private synthetic
monitoring, you just need to add an API key using `-e METRIST_API_KEY=<your key>`. If you want to export Orchestrator's
listening port for in-process monitoring, you should add `-p 51712:51712/udp`. With both, for example:

   docker run -e METRIST_API_KEY=$METRIST_API_KEY -p 51712:51712/udp $latest

## Debian package installation

Systems supported:

* Ubuntu for x86, 64 bit: 20.04, 22.04

If you are on a supported system for Debian package installation, you can simply download the package:

    sudo apt install -y wget gpg curl
    orch_latest=$(curl https://dist.metrist.io/orchestrator/ubuntu/20.04.x86_64.latest.txt)
    wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest
    wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest.asc
    gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc

(with "20.04" replaced by the distribution you are actually using).

Installation then proceeds by installing the package:

    sudo apt install -y ./$orch_latest

And adding your API key:

    cat <<EOF | sudo tee -a /etc/default/metrist-orchestrator
    METRIST_API_TOKEN=$METRIST_API_KEY
    EOF

You can then proceed to start the software using systemd:

    sudo systemctl enable --now metrist-orchestrator
    sudo systemctl start metrist-orchestrator

A quick `journalctl --unit metrist-orchestrator` should show a running program.

### Unsupported platforms with Debian package format

Note that the above Debian package _should_ work for Ubuntu/Debian-like
platforms that have the same C libraries as the supported Ubuntu versions
(like actual Debian distributions and non-LTS Ubuntu versions). We do
not support this, however. Please contact us if you want your system
added to the list.

## Installation from source

Installation from source is simplest using [asdf-vm](https://asdf-vm.com/). Just fetch the source code from Git,
install dependencies using `asdf`, and build:

    git clone git@github.com:Metrist-Software/orchestrator.git
    cd orchestrator
    asdf install
    export MIX_ENV=prod
    mix do deps.get, compile, release

This will create an executable `_build/prod/rel/bakeware/orchestrator` that you can then directly run (assuming that
you have set the API key as above).

### Without asdf

If you do not or can not use asdf-vm, please check `.tool-versions` for dependencies. You will, at a minimum, need current
versions of Erlang and Elixir.
