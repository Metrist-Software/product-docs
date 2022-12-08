---
title: AWS EC2
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of the [AWS EC2 service](https://aws.amazon.com/ec2/).

Name

: `ec2`

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

# (Required) Any valid AWS Region name.
METRIST_REGION=""

# (Required) The ID of an Amazon Machine Image.
METRIST_AMI_ID=""

# (Required) The ID of a running instance.
METRIST_PERSISTENT_INSTANCE_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "ec2",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "ec2",
    "run_type": "dll"
  },
  "steps": [
    {
      "check_logical_name": "RunInstance",
      "description": "This step attemps to launch an EC2 instance using the AMI for which you have permissions."
    },
    {
      "check_logical_name": "TerminateInstance",
      "description": "This step attemps to terminate the instance created in a previous step."
    },
    {
      "check_logical_name": "DescribePersistentInstance",
      "description": "This step attemps to retrieve description(s) of running instances."
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