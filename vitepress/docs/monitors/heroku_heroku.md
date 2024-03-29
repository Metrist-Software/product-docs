[Back to monitor](heroku.md)

# Package Specs

Description

: Tests Heroku to validate that applications can be pinged, release webhooks are sent, and configurations can be updated.

Name

: `heroku`

Package Name

: `heroku`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) An API key with access to update the configuration of the app described in AppName.
METRIST_HEROKU_API_KEY=""

# (Required) The name of an existing App on Heroku.
METRIST_HEROKU_APP_NAME=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "heroku",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "heroku",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "AppPing",
    "description": "Pings an application.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ConfigUpdate",
    "description": "Updates an application's configuration.",
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