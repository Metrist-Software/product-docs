---
title: Zendesk
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests Zendesk to validate that users can be retrieved and that tickets can be created, soft deleted, and permanently deleted.

Name

: `zendesk`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) The API token to use.
METRIST_ZENDESK_API_TOKEN=""

# (Required) Subdomain to run api calls against. E.g. `metrist` for https://metrist.zendesk.com/api
METRIST_ZENDESK_SUBDOMAIN=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "zendesk",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "zendesk",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "GetUsers",
    "description": "Lists users using the REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTicket",
    "description": "Creates a ticket using the REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "SoftDeleteTicket",
    "description": "Deletes the ticket, (soft deletion), using the REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PermanentlyDeleteTicket",
    "description": "Permanently deletes the ticket using the REST API.",
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