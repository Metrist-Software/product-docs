[Back to monitor](sentry.md)

# Package Specs

Description

: Tests Sentry to validate events can be captured and that issues can be created, resolved, and deleted.

Name

: `sentry`

Package Name

: `sentry`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The API token to use.
METRIST_SENTRY_API_TOKEN=""

# (Required) The ingest URL to use.
METRIST_SENTRY_INGEST_URL=""

# (Required) The organization slug of the organization to use.
METRIST_SENTRY_ORGANIZATION_SLUG=""

# (Required) The project slug of the project to use.
METRIST_SENTRY_PROJECT_SLUG=""

# (Required) The region to use.
METRIST_SENTRY_REGION=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "sentry",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "sentry",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CaptureEvent",
    "description": "Captures an event.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "WaitForIssue",
    "description": "Waits for an issue to be created from the event.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ResolveIssue",
    "description": "Resolves the issue.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteIssue",
    "description": "Deletes the issue.",
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