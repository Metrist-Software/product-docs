---
title: AWS EC2
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `ec2`

Description

: AWS EC2 Service Monitor

Steps

: `RunInstance` — Launches the specified number of instances using an AMI for which you have permissions.

: `TerminateInstance` — Shuts down the specified AWS EC2 instance.

: `DescribePersistentInstance` — Describes the specified instances.

Extra Configuration

: `Region` — String.

: `AwsAccessKeyId` — String.

: `AwsSecretAccessKey` — String. Or SecureString.

: `AmiID` — ID of your AMI.

: `PersistentInstanceId` — Instance ID of a persistent EC2 instance.

## Description

Use this monitor to observe the AWS EC2 service.


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->

### 2. Monitor Configuration

<!--@include: /parts/_3.md-->

In the environment where your Orchestrator is installed, add the following environment variables.

```
METRIST_EC2_AMI_ID=your_ami_id
METRIST_EC2_AWS_ACCESS_KEY_ID=123_abc
METRIST_EC2_AWS_SECRET_ACCESS_KEY=123456
METRIST_EC2_PERSISTENT_INSTANCE_ID=your-instance-id
METRIST_EC2_REGION=your_region_name
```

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration-env-vars.md-->

### 3. Monitor Registration

<!--@include: /parts/_4.md-->

```json{3-4}
{
	"monitor_logical_name": "ec2",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "ec2",
		"run_type": "dll"
	},
	"steps": [
		{
			"check_logical_name": "RunInstance",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "TerminateInstance",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "DescribePersistentInstance",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"ec2\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"ec2\",\"run_type\":\"DLL\"},\"steps\":[{\"check_logical_name\":\"RunInstance\",\"timeout_secs\":900},{\"check_logical_name\":\"TerminateInstance\",\"timeout_secs\":900},{\"check_logical_name\":\"DescribePersistentInstance\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/api_tip.md-->

<!--@include: /parts/_5.md-->

## 4. Result

<!--@include: /parts/result.md-->
