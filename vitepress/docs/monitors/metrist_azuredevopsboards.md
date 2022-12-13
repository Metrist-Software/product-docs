---
title: Azure DevOps Boards
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of specific [Azure DevOps Board](https://azure.microsoft.com/products/devops/boards/).

Name

: `azuredevopsboards`

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

# (Required) Your Project key as it appears in `https://dev.azure.com/org/{Project}/`.
METRIST_PROJECT=""

# (Required) Your Team name as it appears in `https://dev.azure.com/org/project/{Team}/_apis/wit/wiql`.
METRIST_TEAM=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuredevopsboards",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuredevopsboards",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateWorkItem",
    "description": "This step attempts to create a work item on the given board."
  }, {
    "check_logical_name": "GetWorkItem",
    "description": "This step attempts to retrieve a work item created in a previous step."
  }, {
    "check_logical_name": "EditWorkItem",
    "description": "This step attempts to edit a work item created in a previous step."
  }, {
    "check_logical_name": "DeleteWorkItem",
    "description": "This step attempts to delete a work item created in a previous step."
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