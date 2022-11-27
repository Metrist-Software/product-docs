---
title: New Relic
---

# {{ $frontmatter.title }}

## Monitor Specs

Name

: `newrelic`

Description

: Monitor the observability of [New Relic’s Event API](https://docs.newrelic.com/docs/data-apis/ingest-apis/event-api/introduction-event-api/).

: &nbsp;

## Setup (In a Nutshell)

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Environment

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

```sh
# (Required) A New Relic account number.
METRIST_NEW_RELIC_ACCOUNT_NUMBER=""

# (Required) For submitting event to New Relic’s Insight API.
METRIST_NEW_RELIC_INSIGHT_API_KEY=""

# (Required) Nerdgraph is New Relic’s recommended API for querying events.
METRIST_NEW_RELIC_NERDGRAPH_USER_KEY=""
```

### 3. Monitor Config Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json
{
  "monitor_logical_name": "newrelic",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "newrelic",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "SubmitEvent",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CheckEvent",
    "timeout_secs": 900
  }]
}
```

Convert it to a JSON string, get your Metrist API token, and use the curl request below to register your monitor:

```sh
json= the json above converted to string

echo $json

api_token=YOUR_TOKEN

echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->