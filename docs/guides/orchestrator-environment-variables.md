---
title: Orchestrator Environment Variables
---

# {{ $frontmatter.title }}

We recommend the use of a secrets manager; however, in our documentation we use basic syntax and presume you’ll have a preferred method for protecting your env vars.

## Required

At a minimum, Metrist Orchestrator must know your API token (which you can get from [app.metrist.io/profile](https://app.metrist.io/profile)).

When you follow our [guided installation](/guides/orchestrator-installation), the script prompts you for the key if it finds that `METRIST_API_TOKEN` is empty in your environment.

You may want to define the variable explicitly, as follows:

```sh
export METRIST_API_TOKEN=your_token
```

## Recommended

If you’ve already installed Orchestrator, you may have noticed the Metrist monitor in your dashboard receives, by default, telemetry data to a region called `fake-dev-instance`. This is configurable, see below:

![Metrist monitor telemetry example](/images/fake-dev-instance-monitor-running.png)

### Orchestrator Instance ID

`METRIST_INSTANCE_ID`

```sh
export METRIST_INSTANCE_ID=instance-name
```

This is the instance id used for reporting. It can be any logical name, but **should be unique and consistent between runs**. Metrist will use this value to supply the instance with the date & time of last monitor runs.

For example:

- We run monitors in several Azure, AWS, and GCP regions. Each Orchestrator instance is named accordingly: `us-west-1`, `us-east-2`, `az:canadacentral`, _etc_.

- You may run Metrist Orchestrator in several offices, or departments, or servers; you can use these values to identify each instance.

### Orchestrator Run Groups

`METRIST_RUN_GROUPS`

```sh
export METRIST_RUN_GROUPS=group_1,groupTwo,group-3

# one item, or a comma-separated list
```

The information defines one or more “groups” in which Orchestrator will “run”/schedule your monitors.

For example:

- We may use these values to schedule all our AWS monitors in all our Orchestrator instances hosted at Azure. (_Yes_, we test across platforms in this way.) In the environments running Orchestrator on Azure’s servers, our `METRIST_RUN_GROUPS` value may look like: `"ca-central-1,us-east-1,us-east-2,us-west-1,us-west-2"`.

  Metrist then knows those Orchestrators are willing to run monitors configured for those run groups. (Learn to configure new monitors using our [monitor config API](/tools/api).)

- You may have Metrist in-process agents (what we call [IPA monitors](/guides/download-overview#terminology)) running throughout a backend system; and you may have other [synthetic monitors](/guides/download-overview#terminology) running against all your API endpoints. You could, for example, run an Orchestrator for each set of monitors:

  - In Orchestrator #1 `METRIST_RUN_GROUPS=all-our-in-process-monitors`
  - In Orchestrator #2 `METRIST_RUN_GROUPS=all-our-endpoint-monitors`
  - Even a 3rd Orchestrator to run them all: `METRIST_RUN_GROUPS=all-our-in-process-monitors,all-our-endpoint-monitors`

## Optional: Orchestrator Behaviour

While these environment variables are optional, they can help control the behaviour of each Orchestrator instance.

`METRIST_INSTANCE_ID`

: A string. (Usually, but not necessarily, [kebab case](https://textedit.tools/kebabcase).)

: This is the instance id used for reporting. It can be any logical name, but **should be unique and consistent between runs**. Metrist will use this value to supply the instance with the date & time of last monitor runs.

`METRIST_RUN_GROUPS`

: A string. (Usually, but not necessarily, [kebab case](https://textedit.tools/kebabcase).)

: The information defines one or more “groups” in which Orchestrator will “run”/schedule your monitors. When more than one, a comma-separated list. This can be used to have several instances of Orchestrator run some same set of monitors.

`METRIST_CLEANUP_ENABLED`

: Any string. (Empty means “don’t clean up”.)

: A flag that determines whether to run cleanup actions.

: Some monitors produce artefacts as they run. For example, a monitor may create a database or download a file. Such monitors can have a “Cleanup” action to clean up the artefacts produced during previous runs — this can occur when a monitor cannot remove the objects themselves (because of a crash or a provider outage, _etc_). As these operations can be expensive, it is best to only schedule them on a subset of instances.

`METRIST_SECRETS_SOURCE`

: `aws` (Or empty.)

: When monitors need secrets like API keys or database passwords, this is a pointer to the secrets source. Currently only `aws` is supported (and is the default), which will try to retrieve secrets from AWS Secrets Manager.

`METRIST_CMA_CONFIG` <Badge type="warning" text="beta" />

: An agent configuration file. (Currently only used for in-process forwarding patterns.)

`METRIST_LOGGING_LEVEL`

: `Info` (Default) | `Debug` | `Error` | `Notice` | `Warning` | `Critical` | `Alert` | `Emergency`

: The level at which to log.

: Usually the default is fine (`Info`) but sometimes `Debug` makes sense. `Error` can be used to make the process less talkative. `Notice`, `Warning`, `Critical`, `Alert` and `Emergency` are also accepted options don’t make much difference and might not be supported by all monitors (each monitor may have specific interpretations of this variable).

`METRIST_IPA_LOOPBACK_ONLY`

: Any string. (Empty by default.) (Anything but empty means “open the UDP socket **only** for the loopback/localhost address”.)

: Whether to open the UDP socket for in-process data **only** on the loopback/localhost address.

: This can be used to restrict this sort of traffic to only the local machine. Off by default which means that the “wildcard” address is bound, making the UDP socket accessible to all machines that can route to the instance.

## Optional: Monitor Configuration

Monitors may each require their own, unique environment variables.

Refer to our [Monitors Library](/monitors/shared/) for examples.
