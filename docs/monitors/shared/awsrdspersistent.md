---
title: AWS RDS Instance
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `awsrdspersistent`

Description

: AWS RDS Instance Monitor

Steps

: `PingInstance`

Extra Configuration

: `address` - host name/address of the instance

: `dbname` - name of database to ping

: `engine` - "postgres" | any other value will default to "mysql" [(Contact us to support other engines.)](https://etrist.io/contact/)

: `password` - a password

: `port` - a number

: `user` - a username

## Description

Our customers often use our `awsrds` monitor to observe the general health of AWS RDS services but use this `awsrdspersistent` monitor to observe the health of a specific, running instance of an AWS RDS database.

## Setup (In a Nutshell)

To monitor the health of your own instance of an AWS RDS database:

1. [Install Metrist Orchestrator](/guides/orchestrator-installation) in your own environment.
1. Configure Metrist Orchestrator with your Metrist API Token and the Extra Configuration required for this specific monitor.
1. Register the monitor using [Metrist Monitor API](/tools/api).
1. Observe the monitor in your [Metrist.io](https://app.metrist.io/) account.

## Setup (Detailed Steps)

### 1. Pre-requisites

A Metrist account.
- If someone in your team already has a Metrist account, [they can invite you](/guides/web-app-invites).
- Or [create a new account](https://app.metrist.io/login/signup).

Metrist Orchestrator.
- Follow these [installation instructions](/guides/orchestrator-installation) to get Orchestator running on your own device.

At this point, you have running instance of Orchestrator and will have set up at least these environment variables:

```
METRIST_API_TOKEN
METRIST_INSTANCE_ID
METRIST_RUN_GROUPS
```

### 2. Monitor Configuration

With a Metrist account and Orchestrator installed, you are ready to configure Orchestrator for use with `awsrdspersistent` monitor.

In the environment where your Orchestrator is installed, add the following environment variables.

::: warning Note
These values are never transmitted to Metrist — they are never exposed outside your environment.
:::

```
METRIST_AWSRDSPERSISTENT_ADDRESS=your.ip.or.domain.name
METRIST_AWSRDSPERSISTENT_DBNAME=your_db_name
METRIST_AWSRDSPERSISTENT_ENGINE=postgres (or mysql)
METRIST_AWSRDSPERSISTENT_PASSWORD=123_abc
METRIST_AWSRDSPERSISTENT_PORT=123456
METRIST_AWSRDSPERSISTENT_USER=your_username
```

<!-- (You can start running Orchestrator now?) -->

### 3. Monitor Registration

With monitor configuration now available in your local instance of Orchestrator, the last step is to inform Metrist of your monitor. Metrist will then run schedule the appropriate tests and record the relevant telemetry data (e.g., “orchestrate”).

In the following code, adjust the values of `timeout_secs`, `interval_secs`, and `run_groups` to suit your needs. `run_groups` **must** include at least 1 value in the list defined in `METRIST_RUN_GROUPS` environment variable. Leave all other values as they are defined below.

```json{3-4,12}
{
	"monitor_logical_name": "awsrdspersistent",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "awsrdspersistent",
		"run_type": "exe"
	},
	"steps": [
		{
			"check_logical_name": "PingInstance",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"awsrdspersistent\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"awsrdspersistent\",\"run_type\":\"exe\"},\"steps\":[{\"check_logical_name\":\"PingInstance\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

That code should return a key such as `11zLBF1eZq9g3wZh86nYXV8`.

::: tip
Tip: Our [API](/tools/api) documentation describes how to delete/unregister the monitor.
:::


## Result

Metrist now runs the `awsrdspersistent` monitor through your Orchestrator. As soon as your Orchestrator reports telemetry data to Metrist, your new monitor will be visible at [app.metrist.io](https://app.metrist.io).
