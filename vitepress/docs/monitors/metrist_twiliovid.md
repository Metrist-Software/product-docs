---
title: Twilio Video
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests Twilio Video to validate that rooms can be created, retrieved, and completed.

Name

: `twiliovid`

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
  "monitor_logical_name": "twiliovid",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "twiliovid",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateRoom",
    "description": "Creates a room using the Twilio C# library for the REST API."
  }, {
    "check_logical_name": "GetRoom",
    "description": "Fetches the room using the Twilio C# library for the REST API."
  }, {
    "check_logical_name": "CompleteRoom",
    "description": "Updates the room, setting its status to completed, using the Twilio C# library for the REST API."
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