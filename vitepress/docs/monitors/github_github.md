[Back to monitor](github.md)

# Package Specs

Description

: Tests GitHub to validate that code can be pushed and pulled and that remote branches can be removed.

Name

: `github`

Package Name

: `github`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Github username to use for Github operations.
METRIST_GITHUB_USERNAME=""

# (Required) Github repository name to use for Github operations.
METRIST_GITHUB_REPOSITORY=""

# (Required) Github API token with access to Issues, Pull, and Push.
METRIST_GITHUB_API_TOKEN=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "github",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "github",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "PullCode",
    "description": "Pulls code from a git repository.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PushCode",
    "description": "Pushes code to a git repository.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "RemoveRemoteBranch",
    "description": "Removes a remote branch from a git repository.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PullRequests",
    "description": "Loads the pull requests web UI.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "Issues",
    "description": "Loads the issues web UI.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "Raw",
    "description": "Loads a file from raw.githubusercontent.com.",
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