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

: `address` — host name/address of the instance

: `dbname` — name of database to ping

: `engine` — "postgres" | any other value will default to "mysql" [(Contact us to support other engines.)](https://etrist.io/contact/)

: `password` — a password

: `port` — a number

: `user` — a username

## Description

Our customers often use our `awsrds` monitor to observe the health of AWS RDS services but use this `awsrdspersistent` monitor to observe the health of a specific, running instance of an AWS RDS database.

## Setup (In a Nutshell)

To monitor the health of your own instance of an AWS RDS database:

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Configuration

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

In the environment where your Orchestrator is installed, add the following environment variables.

```
METRIST_AWSRDSPERSISTENT_ADDRESS=your.ip.or.domain.name
METRIST_AWSRDSPERSISTENT_DBNAME=your_db_name
METRIST_AWSRDSPERSISTENT_ENGINE=postgres (or mysql)
METRIST_AWSRDSPERSISTENT_PASSWORD=123_abc
METRIST_AWSRDSPERSISTENT_PORT=123456
METRIST_AWSRDSPERSISTENT_USER=your_username
```

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration-env-vars.md-->

### 3. Monitor Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

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

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->
