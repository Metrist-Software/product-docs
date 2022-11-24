---
title: AWS CloudFront
---

# {{ $frontmatter.title }}

## Monitor Specs

Name (`monitor_logical_name`)

: `awscloudfront`

Description

: AWS CloudFront

Steps

: `PublishFile`

: `GetNewFile`

: `UpdateFile`

: `PurgeFile`

: `GetUpdatedFile`

: `DeleteFile`

: `WaitForDeletionPropagation`

Extra Configuration

: `AWSRegion` — String.

: `AWSAccessKeyID` — String. See [BasicAWSCredentials Class](https://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/T_Amazon_Runtime_BasicAWSCredentials.htm)

: `AWSSecretAccessKey` — String or SecureString. See [BasicAWSCredentials Class](https://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/T_Amazon_Runtime_BasicAWSCredentials.htm)

: `BucketName` — Amazon S3 bucket name.

: `DistributionDomainName` — Domain name of CloudFront distribution

: `DistributionId` — ID of CloudFront distribution


## Description

Use this monitor to observe a specific CloudFront distribution.

## Setup (In a Nutshell)

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Configuration

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

In the environment where your Orchestrator is installed, add the following environment variables.

```
AWS_REGION=a_valid_aws_region_name
AWS_ACCESS_KEY_ID=your_id
AWS_SECRET_ACCESS_KEY=your_key
BUCKET=your-bucket-name
DISTRIBUTION_DOMAIN_NAME=your-distribution.domain
DISTRIBUTION_ID=your_distribution_id
```

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration-env-vars.md-->

### 3. Monitor Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json{3-4,12}
{
	"monitor_logical_name": "awscloudfront",
	"interval_secs": 120,
	"run_groups": ["match-one", "or-more", "run-groups"],
	"run_spec": {
		"name": "awscloudfront",
		"run_type": "dll"
	},
	"steps": [
		{
			"check_logical_name": "PingInstance",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "PublishFile",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "GetNewFile",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "UpdateFile",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "PurgeFile",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "GetUpdatedFile",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "DeleteFile",
			"timeout_secs": 900
		},
		{
			"check_logical_name": "WaitForDeletionPropagation",
			"timeout_secs": 900
		}
	]
}
```

Convert it to a JSON string (like below), get your Metrist API token, and use the curl request below to register your monitor:

```sh
json="{\"monitor_logical_name\":\"awscloudfront\",\"interval_secs\":120,\"run_groups\":[\"match-one\",\"or-more\",\"run-groups\"],\"run_spec\":{\"name\":\"awscloudfront\",\"run_type\":\"dll\"},\"steps\":[{\"check_logical_name\":\"PingInstance\",\"timeout_secs\":900},{\"check_logical_name\":\"PublishFile\",\"timeout_secs\":900},{\"check_logical_name\":\"GetNewFile\",\"timeout_secs\":900},{\"check_logical_name\":\"UpdateFile\",\"timeout_secs\":900},{\"check_logical_name\":\"PurgeFile\",\"timeout_secs\":900},{\"check_logical_name\":\"GetUpdatedFile\",\"timeout_secs\":900},{\"check_logical_name\":\"DeleteFile\",\"timeout_secs\":900},{\"check_logical_name\":\"WaitForDeletionPropagation\",\"timeout_secs\":900}]}"

api_token=YOUR_TOKEN

echo $json
echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->
