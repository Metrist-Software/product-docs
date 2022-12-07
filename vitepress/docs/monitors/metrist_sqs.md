---
title: AWS SQS
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [AWS Simple Queue Service](https://aws.amazon.com/sqs/).

Name

: `sqs`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) The SQS Queue url to which messages will be written or read.
METRIST_QUEUE_URL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "sqs",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "sqs",
    "run_type": "dll",
  }
  "steps": [
    {
      "check_logical_name": "WriteMessage",
      "description": "This step attemps to write a message to a queue.",
    },
    {
      "check_logical_name": "ReadMessage",
      "description": "This step attemps to retrieve a message created in a previous step.",
    },
  ]
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