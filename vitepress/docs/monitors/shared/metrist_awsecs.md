---
title: AWS ECS (Fargate)
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `awsecs`

Description

: AWS ECS Container Service Monitor

Steps

: `CreateService` — Create AWS ECS using the Create ECS API call.

: `PingService` — Ping AWS ECS using the Ping ECS API call.

: `DestroyService` — Destroy AWS ECS using the Destroy ECS API call.

Extra Configuration

: `AwsAccessKeyId` — String.

: `AwsLbDnsName` — String.

: `AwsLbTargetGroupArn` — String.

: `AwsSecretAccessKey` — String.

: `AwsTaskDefinitionArn` — String.

: `ClusterId` — String.

: `Region` — String.

: `SecurityGroupId` — String.

: `VpcPublicSubnets` — Comma-separated list of strings.

## Description

Use this monitor to observe the AWS Elastic Container Service.

## Setup (In a Nutshell)

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Configuration

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

In the environment where your Orchestrator is installed, add the following environment variables.

```
METRIST_AWSECS_AWS_ACCESS_KEY_ID=abc_123
METRIST_AWSECS_AWS_SECRET_ACCESS_KEY=abc_123
METRIST_AWSECS_VPC_SECURITY_GROUP_ID=abc_123
METRIST_AWSECS_AWS_ECS_CLUSTER_ID=abc_123
METRIST_AWSECS_AWS_ECS_VPC_PUBLIC_SUBNETS=abc_123,abc_123
METRIST_AWSECS_AWS_ECS_LB_TARGET_GROUP_ARN=abc_123
METRIST_AWSECS_AWS_ECS_TASK_DEFINITION_ARN=abc_123
METRIST_AWSECS_AWS_ECS_LB_DNS_NAME=abc_123
```

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration-env-vars.md-->

### 3. Monitor Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json{3-4}
{
	"monitor_logical_name": "awsecs",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "awsecs",
		"run_type": "exe"
	},
	"steps": [
		{
			"check_logical_name": "CreateService",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "PingService",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "DestroyService",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"awsecs\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"awsecs\",\"run_type\":\"exe\"},\"steps\":[{\"check_logical_name\":\"CreateService\",\"timeout_secs\":900},{\"check_logical_name\":\"PingService\",\"timeout_secs\":900},{\"check_logical_name\":\"DestroyService\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->
