---
title: AWS CloudWatch
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `awscloudwatch`

Description

: AWS CloudWatch

Steps

: `SubmitEvent` — Submit a metric to Cloudwatch using the PutMetricData API call.

: `GetEvent` — List metrics matching our test metric we submitted using the ListMetricsCommand API call.

Extra Configuration

: `AWSAccessKeyID` — String.

: `AWSSecretAccessKey` — String or SecureString.

## Description

Use this monitor to observe AWS CloudWatch.

## Setup (In a Nutshell)

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Configuration

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

In the environment where your Orchestrator is installed, add the following environment variables.

```
AWS_ACCESS_KEY_ID=your_id
AWS_SECRET_ACCESS_KEY=your_key
```

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration-env-vars.md-->

### 3. Monitor Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json{3-4}
{
	"monitor_logical_name": "awscloudwatch",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "awscloudwatch",
		"run_type": "exe"
	},
	"steps": [
		{
			"check_logical_name": "SubmitEvent",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "GetEvent",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"awscloudwatch\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"awscloudwatch\",\"run_type\":\"exe\"},\"steps\":[{\"check_logical_name\":\"SubmitEvent\",\"timeout_secs\":900},{\"check_logical_name\":\"GetEvent\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->
