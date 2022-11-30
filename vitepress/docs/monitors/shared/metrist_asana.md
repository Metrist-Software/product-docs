---
title: Asana
---

# {{ $frontmatter.title }}

## Monitor Specs

Name

: `asana`

Version

: 1.0.0

Description

: Monitor the observability of [Asana’s API](https://developers.asana.com/docs).

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->





<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "asana",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "asana",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "Ping",
    "description": "This step attempts to ping Asana’s public API.",
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
