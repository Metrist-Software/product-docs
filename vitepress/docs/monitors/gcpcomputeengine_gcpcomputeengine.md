[Back to monitor](gcpcomputeengine.md)

# Package Specs

Description

: Tests Google Compute Engine to validate that instances can be created, described, and deleted.

Name

: `gcpcomputeengine`

Package Name

: `gcpcomputeengine`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The base 64 encoded credentials string to use for Cloud Storage operations.
METRIST_GCPCOMPUTEENGINE_PRIVATE_KEY=""

# (Required) The GCP project ID to use for GCP compute engine operations.
METRIST_GCPCOMPUTEENGINE_PROJECT_ID=""

# (Required) An environment tag to use for deployed elements.
METRIST_GCPAPPENGINE_ENVIRONMENT_TAG=""

# (Required) Any valid GCP region.
METRIST_GCPAPPENGINE_REGION=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "gcpcomputeengine",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "gcpcomputeengine",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateInstance",
    "description": "Creates an instance.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetInstanceInfo",
    "description": "Gets information about the instance.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteInstance",
    "description": "Deletes the instance.",
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