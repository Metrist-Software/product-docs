---
title: AWS CloudFront
---

# {{ $frontmatter.title }}

## Monitor Specs

Name

: `awscloudfront`

Version

: 1.0.0

Description

: Monitor the observability of a specific [AWS CloudFront Distribution](https://aws.amazon.com/cloudfront/).

: &nbsp;

<!--@include: /parts/setup-in-a-nutshell.md-->


<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Environment

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

```sh
# (Required) Any valid AWS Region name.
METRIST_AWS_REGION=""

# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) The name of your S3 bucket.
METRIST_BUCKET=""

# (Required) The CloudFront domain name needed when linking to your objects.
METRIST_DISTRIBUTION_DOMAIN_NAME=""

# (Required) The id assign to the distribution.
METRIST_DISTRIBUTION_ID=""
```

### 3. Monitor Config Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json
{
  "monitor_logical_name": "awscloudfront",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "awscloudfront",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "PublishFile",
    "description": "This step attemps to asynchronously put a file in an S3 bucket.",
    "required": true,
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetNewFile",
    "description": "This step attemps to retrieve the file created in the previous step.",
    "required": true,
    "timeout_secs": 900
  }, {
    "check_logical_name": "UpdateFile",
    "description": "This step attemps to update the file created in the previous step.",
    "required": false,
    "timeout_secs": 900
  }, {
    "check_logical_name": "PurgeFile",
    "description": "This step attemps to purge items from the distribution.",
    "required": true,
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetUpdatedFile",
    "description": false,
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteFile",
    "description": "This step attemps to delete the file created in a previous step.",
    "required": true,
    "timeout_secs": 900
  }, {
    "check_logical_name": "WaitForDeletionPropagation",
    "description": "This step attemps to confirm the DeleteFile step was successful.",
    "required": false,
    "timeout_secs": 900
  }]
}
```

Convert it to a JSON string, get your Metrist API token, and use the curl request below to register your monitor:

```sh
json= the json above converted to string

echo $json

api_token=YOUR_TOKEN

echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->