---
title: New Relic
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the functionality of New Relic's web UI.

Name

: `newrelic`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) Username to log in to NewRelic's UI with.
METRIST_NEW_RELIC_USERNAME=""

# (Required) Password for the associated user.
METRIST_NEW_RELIC_PASSWORD=""

# (Required) ID of the dashboard to load.
METRIST_NEW_RELIC_DASHBOARD_ID=""

# (Required) XPath string to use for validating dashboard page has loaded successfully.
METRIST_NEW_RELIC_DASHBOARD_XPATH=""

# (Required) ID of the synthetic monitor to load.
METRIST_NEW_RELIC_SYNTHETIC_MONITOR_ID=""

# (Required) XPath string to use for validating synthetic monitor page has loaded successfully.
METRIST_NEW_RELIC_SYNTHETICS_XPATH=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "newrelic",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "newrelic",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "OpenDashboardUI",
    "description": "Load a dashboard in the New Relic web UI",
    "timeout_secs": 900
  }, {
    "check_logical_name": "OpenSyntheticsUI",
    "description": "Load a synthetic monitor in the New Relic web UI",
    "timeout_secs": 900
  }, {
    "check_logical_name": "OpenAlertsUI",
    "description": "Load the Alerting Overview page in the New Relic web UI",
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