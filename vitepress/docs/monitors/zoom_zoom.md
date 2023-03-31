[Back to monitor](zoom.md)

# Package Specs

Description

: Tests Zoom API.

Name

: `zoom`

Package Name

: `zoom`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The API key to use.
METRIST_ZOOM_API_KEY=""

# (Required) The API secret to use.
METRIST_ZOOM_API_SECRET=""

# (Required) The user ID of the user for the meeting. Required if CreateMeeting is enabled.
METRIST_ZOOM_MEETING_USER_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "zoom",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "zoom",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "GetUsers",
    "description": "Gets users using the REST API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateMeeting",
    "description": "Create a meeting.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetMeeting",
    "description": "Gets meeting details.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteMeeting",
    "description": "Deletes a meeting.",
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