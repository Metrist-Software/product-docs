[Back to monitor](neon.md)

# Package Specs

Description

: Monitor Neon's API

Name

: `neon`

Package Name

: `neon`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) API key
METRIST_NEON_API_KEY=""

# (Required) The Project Id to create and delete the branches on
METRIST_NEON_PROJECT_ID=""

# (Required) The base branch from which to create the new branch
METRIST_NEON_BASE_BRANCH_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "neon",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "neon",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateBranch",
    "description": "Create a new branch",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteBranch",
    "description": "Delete a branch",
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