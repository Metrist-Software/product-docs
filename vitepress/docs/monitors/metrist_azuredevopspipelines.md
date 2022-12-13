---
title: Azure DevOps Pipelines
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Azure DevOps Pipeslines service](https://azure.microsoft.com/products/devops/pipelines/).

Name

: `azuredevopspipelines`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) Your Organization name as it appears in `https://dev.azure.com/{Organization}/`.
METRIST_ORGANIZATION=""

# (Required) A personal access token associated with your team’s project board.
METRIST_PERSONAL_ACCESS_TOKEN=""

# (Required) Your Project key as it appears in `https://dev.azure.com/org/project/_apis/pipelines/{pipelineId}`.
METRIST_PIPELINE_ID=""

# (Required) Your Project key as it appears in `https://dev.azure.com/org/{Project}/`.
METRIST_PROJECT=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuredevopspipelines",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuredevopspipelines",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "StartMachineWorkflow",
    "description": "This step attempts to start a workflow on the given pipeline."
  }, {
    "check_logical_name": "WaitForMachineWorkflowRunToComplete",
    "description": "This step attempts to read the result of a workflow started in a previous step."
  }, {
    "check_logical_name": "StartDockerWorkflow",
    "description": "This step attempts to start a workflow using Docker on the given pipeline."
  }, {
    "check_logical_name": "WaitForDockerWorkflowRunToComplete",
    "description": "This step attempts to read the result of a workflow started in a previous step."
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