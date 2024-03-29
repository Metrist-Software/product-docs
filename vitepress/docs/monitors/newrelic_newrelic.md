[Back to monitor](newrelic.md)

# Package Specs

Description

: Monitor the observability of [New Relic's Event API](https://docs.newrelic.com/docs/data-apis/ingest-apis/event-api/introduction-event-api/).

Name

: `newrelic`

Package Name

: `newrelic`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A New Relic account number.
METRIST_NEWRELIC_NEW_RELIC_ACCOUNT_NUMBER=""

# (Required) For submitting event to New Relic's Insight API.
METRIST_NEWRELIC_NEW_RELIC_INSIGHT_API_KEY=""

# (Required) Nerdgraph is New Relic's recommended API for querying events.
METRIST_NEWRELIC_NEW_RELIC_NERDGRAPH_USER_KEY=""
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
    "check_logical_name": "SubmitEvent",
    "description": "This step attempts to submit an event through the Event API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CheckEvent",
    "description": "This step attempts to use the NerdGraph Graphql API to retrieve the event submitted in the previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateSyntheticMonitor",
    "description": "Creates a synthetic monitor that pings https://newrelic.com",
    "timeout_secs": 900
  }, {
    "check_logical_name": "WaitForSyntheticMonitorResponse",
    "description": "Waits for the result of the created synthetic monitor to be available.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteSyntheticMonitor",
    "description": "Deletes the previously created synthetic monitor.",
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