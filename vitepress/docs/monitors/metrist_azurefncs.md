---
title: Azure Functions
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Azure Functions service](https://azure.microsoft.com/products/functions/).

Name

: `azurefncs`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) A code (any value) to which your function will respond.
METRIST_TEST_FUNCTION_CODE=""

# (Required) The url of an existing Azure Function endpoint. The function must be written to expect, and respond to, the given code.
METRIST_TEST_FUNCTION_URL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azurefncs",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "azurefncs",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "RunHttpTrigger",
    "description": "This step triggers a GET request to the given url and appends `?code={the_given_value}`."
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