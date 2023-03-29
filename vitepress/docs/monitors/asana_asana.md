[Back to monitor](asana.md)

# Package Specs

Description

: Monitor the observability of [Asana's API](https://developers.asana.com/docs).

Name

: `asana`

Package Name

: `asana`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The ID of the project to use.
METRIST_ASANA_PROJECT_ID=""

# (Required) The ID of the workspace to use.
METRIST_ASANA_WORKSPACE_ID=""

# (Required) The personal access token to use.
METRIST_ASANA_PERSONAL_ACCESS_TOKEN=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "asana",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "asana",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "Ping",
    "description": "This step pings Asana's users REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTask",
    "description": "This step creates a task using Asana's REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetTask",
    "description": "This step retrieves a task using Asana's REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteTask",
    "description": "This step deletes a task using Asana's REST API.",
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