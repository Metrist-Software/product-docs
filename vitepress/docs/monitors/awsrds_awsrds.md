[Back to monitor](awsrds.md)

# Package Specs

Description

: Monitor the observability of [AWS RDS service](https://aws.amazon.com/rds/).

Name

: `awsrds`

Package Name

: `awsrds`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWSRDS_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWSRDS_SECRET_ACCESS_KEY=""

# (Required) A security group ID relevant to your RDS.
METRIST_AWSRDS_VPC_SECURITY_GROUP_ID=""

# (Required) ID of the subnets associated with the service
METRIST_AWSRDS_DB_SUBNET_GROUP_NAME=""

# (Required) Any valid AWS Region name.
METRIST_AWSRDS_REGION=""

# (Required) A name used as part of the created RDS instance Id.
METRIST_AWSRDS_ENVIRONMENT_TAG=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsrds",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awsrds",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateInstance",
    "description": "This step attempts to create a MySQL RDS instance.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PingInstance",
    "description": "This step attempts to ping the RDS instance created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DestroyInstance",
    "description": "This step attempts to destory the RDS instance created in a previous step.",
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