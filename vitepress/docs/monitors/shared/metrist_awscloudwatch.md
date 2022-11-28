---
title: AWS CloudWatch
---

AWS CloudWatch

# {{ $frontmatter.title }}

## Monitor Specs

Name

: `awscloudwatch`

Description

: Monitor the observability of a [AWS CloudWatch services](https://aws.amazon.com/cloudwatch/).

: &nbsp;

<!--@include: /parts/setup-in-a-nutshell.md-->


<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Environment

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

```sh
# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""
```

### 3. Monitor Config Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json
{
  "monitor_logical_name": "awscloudwatch",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "awscloudwatch",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "SubmitEvent",
    "description": "This step attemps to submit an event to the logs.",
    "required": true,
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetEvent",
    "description": "This step attemps to retrieve an event from the logs (not the event submitted in the previous step).",
    "required": true,
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