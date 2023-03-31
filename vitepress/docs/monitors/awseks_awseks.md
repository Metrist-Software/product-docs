[Back to monitor](awseks.md)

# Package Specs

Description

: Monitor the observability of [AWS Elastic Kubernetes Service](https://aws.amazon.com/eks/).

Name

: `awseks`

Package Name

: `awseks`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWSEKS_A_W_S_ACCESS_KEY_ID=""

# (Required) Any valid AWS Region name.
METRIST_AWSEKS_A_W_S_REGION=""

# (Required) Your AWS Secret Access Key.
METRIST_AWSEKS_A_W_S_SECRET_ACCESS_KEY=""

# (Required) The name of an existing cluster in which to attemp deployment.
METRIST_AWSEKS_CLUSTER_NAME=""

# (Required) The name of an endpoint for the newly deployed cluster/server.
METRIST_AWSEKS_CLUSTER_SERVER_ADDRESS=""

# (Required) The Certificate Authority Data related to the cluster server address/endpoint.
METRIST_AWSEKS_CLUSTER_CERTIFICATE_AUTHORITY_DATA=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awseks",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awseks",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateDeployment",
    "description": "This step attempts to deploy a container into a cluster.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "RemoveDeployment",
    "description": "This step attempts to remove the container deployed in a previous step.",
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