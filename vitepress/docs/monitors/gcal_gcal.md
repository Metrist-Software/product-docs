[Back to monitor](gcal.md)

# Package Specs

Description

: Tests Google Calendar to validate that events can be created, retrieved, and deleted.

Name

: `gcal`

Package Name

: `gcal`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A calendar to operate on.
METRIST_GCAL_CALENDAR_NAME=""

# (Required) Base64 encoded user credentials that are allowed to create/retrieve/delete events on the specified calendar.
METRIST_GCAL_CALENDAR_NAME=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "gcal",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "gcal",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateEvent",
    "description": "Creates an event.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetEvent",
    "description": "Gets an event.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteEvent",
    "description": "Deletes an event.",
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