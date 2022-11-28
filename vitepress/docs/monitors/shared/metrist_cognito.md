---
title: AWS Cognito
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `cognito`

Description

: AWS Cognito

Steps

: `CreateUser`

: `DeleteUser`

Extra Configuration

: `AWSAccessKeyID` — String.

: `AWSSecretAccessKey` — String or SecureString.

: `UserPool` — String.

## Description

Use this monitor to observe AWS Cognito Identity Provider.


<!--@include: /parts/setup-in-a-nutshell.md-->


<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Configuration

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

In the environment where your Orchestrator is installed, add the following environment variables.

```
AWS_ACCESS_KEY_ID=your_id
AWS_SECRET_ACCESS_KEY=your_key
USER_POOL=name_of_user_pool
```

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration-env-vars.md-->

### 3. Monitor Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json{3-4}
{
	"monitor_logical_name": "cognito",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "cognito",
		"run_type": "dll"
	},
	"steps": [
		{
			"check_logical_name": "CreateUser",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "DeleteUser",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"cognito\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"cognito\",\"run_type\":\"dll\"},\"steps\":[{\"check_logical_name\":\"CreateUser\",\"timeout_secs\":900},{\"check_logical_name\":\"DeleteUser\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->
