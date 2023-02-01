---
title: Slack
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests Slack to validate that messages can be sent.

Name

: `slack`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) The Slack channel to use.
METRIST_SLACK_CHANNEL=""

# (Required) The API token to use.
METRIST_SLACK_API_TOKEN=""

# (Required) The tag to use. The tag is visible in the automated messages.
METRIST_SLACK_TAG=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "slack",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "slack",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "PostMessage",
    "description": "Sends a message through the API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ReadMessage",
    "description": "Reads the previously sent message through the API.",
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