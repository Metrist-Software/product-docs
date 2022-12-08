---
title: AWS Elastic Container Service — Fargate
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of a [AWS CloudWatch services](https://aws.amazon.com/cloudwatch/).

Name

: `awsecs`

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
AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
AWS_SECRET_ACCESS_KEY=""

# (Required) A load balancer DNS name to ping.
METRIST_AWS_LB_DNS_NAME=""

# (Required) The load balancer target group ARN to access from the load balancer.
METRIST_AWS_LB_TARGET_GROUP_ARN=""

# (Required) Full ARN of the task definition to run in your service.
METRIST_AWS_TASK_DEFINITION_ARN=""

# (Required) ID of the cluster hosted by Amazon ECS.
METRIST_CLUSTER_ID=""

# (Required) Any of the [supported regions](https://docs.aws.amazon.com/AmazonECS/latest/userguide/AWS_Fargate-Regions.html).
METRIST_REGION=""

# (Required) A security group ID relevant to this cluster.
METRIST_SECURITY_GROUP_ID=""

# (Required) Comma-separated list of IDs of the subnets associated with the service.
METRIST_VPC_PUBLIC_SUBNETS=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsecs",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "awsecs",
    "run_type": "exe"
  },
  "steps": [
    {
      "check_logical_name": "CreateService",
      "description": "This step attempts to create an ECS service."
    },
    {
      "check_logical_name": "PingService",
      "description": "This step attemps to ping a load balancer by domain name."
    },
    {
      "check_logical_name": "DestroyService",
      "description": "This step attemps to destroy the service created in an earlier step."
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