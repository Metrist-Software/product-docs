---
title: Azure DevOps
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Azure DevOps service](https://azure.microsoft.com/products/devops/).

Name

: `azuredevops`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) The organization name, as in https://dev.azure.com/${this organization}/
METRIST_ORGANIZATION=""

# (Required) A personal access token, as in https://${this personalaccesstoken}@dev.azure.com/
METRIST_PERSONAL_ACCESS_TOKEN=""

# (Required) A repository logical name, as in https://token@dev.azure.com/org/${this.repository}
METRIST_REPOSITORY=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuredevops",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuredevops",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CloneRepo",
    "description": "This step attempts to clone a given repository."
  }, {
    "check_logical_name": "PushCode",
    "description": "This step attempts to checkout a new branch, write a file, add, commit, and push changes to a given repository."
  }, {
    "check_logical_name": "RemoveRemoteBranch",
    "description": "This step attempts to remove the new branch created in a previous step."
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