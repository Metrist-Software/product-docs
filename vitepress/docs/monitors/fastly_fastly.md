[Back to monitor](fastly.md)

# Package Specs

Description

: Tests Fastly to validate that non-cached and cached files can be retrieved and that caches can be purged.

Name

: `fastly`

Package Name

: `fastly`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A URL to the fastly file to operate on.
METRIST_FASTLY_REQUEST_URI=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "fastly",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "fastly",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "PurgeCache",
    "description": "Purges a cache.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetNonCachedFile",
    "description": "Gets a non-cached file.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetCachedFile",
    "description": "Gets a cached file.",
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