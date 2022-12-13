---
title: GCP Compute Engine
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests Google Compute Engine to validate that instances can be created, described, and deleted.

Name

: `gcpcomputeengine`

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
  "monitor_logical_name": "gcpcomputeengine",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "gcpcomputeengine",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateInstance",
    "description": "Creates an instance."
  }, {
    "check_logical_name": "GetInstanceInfo",
    "description": "Gets information about the instance."
  }, {
    "check_logical_name": "DeleteInstance",
    "description": "Deletes the instance."
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