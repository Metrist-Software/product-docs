---
title: AWS SES
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [AWS Simple Email Service](https://aws.amazon.com/ses/).

Name

: `ses`

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

# (Required) An email address.
METRIST_FROM_EMAIL=""

# (Required) An email address.
METRIST_TO_EMAIL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "ses",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "ses",
    "run_type": "dll",
  }
  "steps": [
    {
      "check_logical_name": "SendEmail",
      "description": "This step attemps to send a message via SES.",
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