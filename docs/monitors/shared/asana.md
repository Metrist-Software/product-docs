---
title: Asana
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `asana`

Description

: Monitor the observability of [Asana’s API](https://developers.asana.com/docs).

Steps

: `Ping`

Extra Configuration

: None

## Description

Our customers often use our `asana` monitor to observe the health of Asana’s API.

## Setup (In a Nutshell)

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Configuration

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

### 3. Monitor Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json{3-4,12}
{
	"monitor_logical_name": "asana",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "asana",
		"run_type": "dll"
	},
	"steps": [
		{
			"check_logical_name": "Ping",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"asana\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"asana\",\"run_type\":\"dll\"},\"steps\":[{\"check_logical_name\":\"Ping\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->

