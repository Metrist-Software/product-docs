[Back to monitor](awslambda.md)

# Package Specs

Description

: Monitor the observability of [AWS Lambda](https://aws.amazon.com/lambda/).

Name

: `awslambda`

Package Name

: `awslambda`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key Id.
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Any valid AWS Region name.
METRIST_AWS_REGION=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) The ARN identifying the location of an existing Lambda function.
METRIST_TEST_FUNCTION_ARN=""

# (Required) The SQS Queue url to which the Lambda function sends a message.
METRIST_QUEUE_URL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awslambda",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awslambda",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "TriggerLambdaAndWaitForResponse",
    "description": "This step attempts to invoke a request and send a payload from a Lambda function to a SQS Queue.",
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