[Back to monitor](gcpappengine.md)

# Package Specs

Description

: Tests Google App Engine to validate that autoscaling, pinging an app, deployments, and migrating traffic are operational.

Name

: `gcpappengine`

Package Name

: `gcpappengine`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The GCP Project ID of the project to perform app engine operations on.
METRIST_GCPAPPENGINE_PROJECT_ID=""

# (Required) The URL to the zip file to use for deployments.
METRIST_GCPAPPENGINE_APP_ZIP_URL=""

# (Required) The hostname to use for the deployed app
METRIST_GCPAPPENGINE_APP_HOSTNAME=""

# (Required) The base 64 encoded credentials string to use for appengine operations.
METRIST_GCPAPPENGINE_PRIVATE_KEY=""

# (Required) An environment tag to use for deployed elements.
METRIST_GCPAPPENGINE_ENVIRONMENT_TAG=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "gcpappengine",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "gcpappengine",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "AutoScaleUp",
    "description": "Performs several rapid requests to trigger autoscaling.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PingApp",
    "description": "Pings an existing instance.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateVersion",
    "description": "Deploys a new version of the service.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "MigrateTraffic",
    "description": "Migrates traffic of a service from one version to another.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "AutoScaleDown",
    "description": "Waits for instance count to return to 0. Instances are created with a 10s idle timeout.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DestroyVersion",
    "description": "Destroys a version of the service.",
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