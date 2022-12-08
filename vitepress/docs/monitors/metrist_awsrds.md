---
title: AWS RDS (MySQL)
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [AWS RDS service](https://aws.amazon.com/rds/).

Name

: `awsrds`

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

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) A security group ID relevant to your RDS.
METRIST_VPC_SECURITY_GROUP_ID=""

# (Required) ID of the subnets associated with the service
METRIST_DB_SUBNET_GROUP_NAME=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsrds",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "awsrds",
    "run_type": "exe"
  },
  "steps": [
    {
      "check_logical_name": "CreateInstance",
      "description": "This step attemps to create a MySQL RDS instance."
    },
    {
      "check_logical_name": "PingInstance",
      "description": "This step attemps to ping the RDS instance created in a previous step."
    },
    {
      "check_logical_name": "DestroyInstance",
      "description": "This step attemps to destory the RDS instance created in a previous step."
    }
  ]
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