---
title: AWS CloudWatch
---

# {{ $frontmatter.title }}

## Monitor Specs

Name

: `awscloudwatch`

Version

: 0.1.0-beta

Description

: Monitor the observability of a [AWS CloudWatch services](https://aws.amazon.com/cloudwatch/).

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Any valid AWS Region name.
METRIST_AWS_REGION=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


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
    "description": "This step attemps to submit a metric using PutMetricData API call.",
    "required": true,
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetEvent",
    "description": "Using ListMetricsCommand API call, this step attemps to retrieve a list of metrics matching the event submitted in a previous step.",
    "required": true,
    "timeout_secs": 900
  }]
}
```

Convert your monitor config to a JSON string, get your Metrist API token, and use the curl request below to register your monitor:

```sh
json= the json above converted to string

echo $json

api_token=YOUR_TOKEN

echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/tips_api.md-->


<!--@include: /parts/_5.md-->


<!--@include: /parts/result.md-->