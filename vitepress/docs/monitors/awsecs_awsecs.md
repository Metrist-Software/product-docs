[Back to monitor](awsecs.md)

# Package Specs

Description

: Monitor the observability of a [AWS ECS services](https://aws.amazon.com/ecs/).

Name

: `awsecs`

Package Name

: `awsecs`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWSECS_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWSECS_AWS_SECRET_ACCESS_KEY=""

# (Required) A load balancer DNS name to ping.
METRIST_AWSECS_AWS_LB_DNS_NAME=""

# (Required) The load balancer target group ARN to access from the load balancer.
METRIST_AWSECS_AWS_LB_TARGET_GROUP_ARN=""

# (Required) Full ARN of the task definition to run in your service.
METRIST_AWSECS_AWS_TASK_DEFINITION_ARN=""

# (Required) ID of the cluster hosted by Amazon ECS.
METRIST_AWSECS_CLUSTER_ID=""

# (Required) Any of the [supported regions](https://docs.aws.amazon.com/AmazonECS/latest/userguide/AWS_Fargate-Regions.html).
METRIST_AWSECS_REGION=""

# (Required) A security group ID relevant to this cluster.
METRIST_AWSECS_SECURITY_GROUP_ID=""

# (Required) Comma-separated list of IDs of the subnets associated with the service.
METRIST_AWSECS_VPC_PUBLIC_SUBNETS=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsecs",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awsecs",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateService",
    "description": "This step attempts to create an ECS service.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PingService",
    "description": "This step attempts to ping a load balancer by domain name.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DestroyService",
    "description": "This step attempts to destroy the service created in an earlier step.",
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