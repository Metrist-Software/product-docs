---
title: Envoy
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Envoy API](https://api.envoy.com/).

Name

: `envoy`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) An Envoy client API key.
METRIST_CLIENT_API_KEY=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "envoy",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "envoy",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "GetEmployees",
    "description": "This step attempts to retrieve a list of employees."
  }, {
    "check_logical_name": "GetReservations",
    "description": "This step attempts to retrieve a list of reservations."
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