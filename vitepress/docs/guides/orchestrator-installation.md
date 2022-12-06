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

<!--@include: /parts/systemctl-process-tips(indented).md-->

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
