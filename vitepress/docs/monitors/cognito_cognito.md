[Back to monitor](cognito.md)

# Package Specs

Description

: Monitor the observability of the [AWS Cognito Identity Provider](https://aws.amazon.com/cognito/).

Name

: `cognito`

Package Name

: `cognito`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_COGNITO_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_COGNITO_AWS_SECRET_ACCESS_KEY=""

# (Required) Name of user pool.
METRIST_COGNITO_USER_POOL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "cognito",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "cognito",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateUser",
    "description": "This step attempts to create a user account (randomly named) using Cognito Identity Provider Client.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteUser",
    "description": "This step attempts to delete the user account created in a previous step.",
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