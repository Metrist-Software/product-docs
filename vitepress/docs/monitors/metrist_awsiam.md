---
title: AWS Identity and Access Management
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [AWS Identity and Access Management service](https://aws.amazon.com/iam/).

Name

: `awsiam`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Any valid AWS Region name.
METRIST_AWS_REGION=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) A name used to retrieve a policy arn, as in `arn:aws:iam::123456789000:policy/AwsIamMonitorTestPolicies/${THIS_NAME}-a_region-awsiam-testpolicy`.
METRIST_NAMESPACE=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsiam",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awsiam",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateUser",
    "description": "This step attempts to create a user, randomly named."
  }, {
    "check_logical_name": "CreateGroup",
    "description": "This step attempts to create a group, randomly named."
  }, {
    "check_logical_name": "AddUserToGroup",
    "description": "This step attempts to add the newly created user to the newly created group."
  }, {
    "check_logical_name": "RemoveUserFromGroup",
    "description": "This step attempts to remove the user from the group."
  }, {
    "check_logical_name": "DeleteGroup",
    "description": "This step attempts to delete the group."
  }, {
    "check_logical_name": "AttachPolicy",
    "description": "This step attempts to attach the user to the given policy arn."
  }, {
    "check_logical_name": "DetachPolicy",
    "description": "This step attempts to detach the user from the given policy arn."
  }, {
    "check_logical_name": "DeleteUser",
    "description": "This step attempts to delete the user created in an earlier step."
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