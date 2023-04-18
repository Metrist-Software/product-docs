[Back to monitor](awssecretsmanager.md)

# Package Specs

Description

: Monitor the availability of [AWS Secrets Manager](https://aws.amazon.com/secretsmanager/).

Name

: `awssecretsmanager`

Package Name

: `awssecretsmanager`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWSSECRETSMANAGER_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWSSECRETSMANAGER_AWS_SECRET_ACCESS_KEY=""

# (Required) Any valid AWS Region name.
METRIST_AWSSECRETSMANAGER_REGION=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awssecretsmanager",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awssecretsmanager",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateSecret",
    "description": "Create a secret.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetSecretValue",
    "description": "Retrieve the value of the secret just created.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteSecret",
    "description": "Delete the secret.",
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
