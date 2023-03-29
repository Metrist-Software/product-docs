[Back to monitor](awselb.md)

# Package Specs

Description

: Monitor the observability of [AWS ELB service](https://aws.amazon.com/elasticloadbalancing/).

Name

: `awselb`

Package Name

: `awselb`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) The id assigned to your ECS cluster.
METRIST_AWS_ECS_CLUSTER_ID=""

# (Required) The service name of your container service.
METRIST_AWS_ECS_SERVICE_ID=""

# (Required) The DNS name of your ELB endpoint — the address to which HTTP requests can be made.
METRIST_AWS_ELB_DNS_NAME=""

# (Required) The target group ARN of your ELB service.
METRIST_AWS_ELB_TARGET_GROUP_ARN=""

# (Required) Any valid AWS Region name.
METRIST_AWS_REGION=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awselb",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awselb",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "ChangeTargetGroup",
    "description": "This step attempts to change an ELB target group and measure how long it takes for the change to become effective.",
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