[Back to monitor](azuremonitor.md)

# Package Specs

Description

: Monitor the observability of [Azure Monitor service](https://azure.microsoft.com/products/monitor/).

Name

: `azuremonitor`

Package Name

: `azuremonitor`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A connection string to be used by a ApplicationInsightsServiceOptions object to AddApplicationInsightsTelemetryWorkerService.
METRIST_CONNECTION_STRING=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuremonitor",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuremonitor",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "TrackEvent",
    "description": "This step attempts to track a known type of event.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "TrackMetricValue",
    "description": "This step attempts to track a metric with a given value.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "TrackExc",
    "description": "This step throws an exception and attempts to track it.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "TrackTrace",
    "description": "This step attempts to track a monitor trace.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "SendLog",
    "description": "This step attempts to send error details to a log.",
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