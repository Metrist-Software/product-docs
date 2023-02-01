---
title: Snowflake
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests Snowflake to validate that databases, tables, and data can be created and deleted.

Name

: `snowflake`

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
  "monitor_logical_name": "snowflake",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "snowflake",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateDatabase",
    "description": "Creates a database.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTable",
    "description": "Creates a table in the database.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PutFile",
    "description": "Puts a file into the table.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetData",
    "description": "Gets data from the table.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteData",
    "description": "Deletes data from the table.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DropTable",
    "description": "Drops the table.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DropDatabase",
    "description": "Drops the database.",
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