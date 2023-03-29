[Back to monitor](circleci.md)

# Package Specs

Description

: Tests CircleCI to validate that Docker and machine workflows can be run and that pipelines can be started.

Name

: `circleci`

Package Name

: `circleci`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The API Token for the account that contains the pipeline & workflows to run.
METRIST_CIRCLECI_API_TOKEN=""

# (Required) The slug of the project that contains the MonitorMachine and MonitorDocker workflows.
METRIST_CIRCLECI_PROJECT_SLUG=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "circleci",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "circleci",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "StartPipeline",
    "description": "Starts a pipeline.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "RunMonitorDockerWorkflow",
    "description": "Runs a Docker workflow.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "RunMonitorMachineWorkflow",
    "description": "Runs a machine workflow.",
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