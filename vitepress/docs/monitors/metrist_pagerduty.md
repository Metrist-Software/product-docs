---
title: PagerDuty
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests PagerDuty to validate that events can be submitted, that incidents can be created, retrieved, and resolved, and that webhooks are sent.

Name

: `pagerduty`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->





<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "pagerduty",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "pagerduty",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateIncident",
    "description": "Submits a trigger event to the v2 events API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CheckForIncident",
    "description": "Polls for incidents using the REST API until the submitted event results in an incident.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ReceiveWebhook",
    "description": "Waits for PagerDuty to send a webhook for the resulting incident.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ResolveIncident",
    "description": "Submits a resolve event for the incident using the v2 events API.",
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