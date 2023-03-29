[Back to monitor](zoom.md)

# Package Specs

Description

: Tests Zoom to validate that rooms can be joined.

Name

: `zoom`

Package Name

: `zoomclient`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "zoom",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "zoomclient",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "JoinCall",
    "description": "Joins a call using the Zoom client and a headless Chrome browser.",
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