[Back to monitor](sqs.md)

# Package Specs

Description

: Monitor the observability of [AWS Simple Queue Service](https://aws.amazon.com/sqs/).

Name

: `sqs`

Package Name

: `sqs`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS Access Key ID.
METRIST_SQS_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS secret access key.
METRIST_SQS_AWS_SECRET_ACCESS_KEY=""

# (Required) The SQS Queue URL to or from which messages will be written or read.
METRIST_SQS_QUEUE_URL=""

# (Required) The region to use.
METRIST_SQS_REGION=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "sqs",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "sqs",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "WriteMessage",
    "description": "This step attempts to write a message to a queue.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ReadMessage",
    "description": "This step attempts to retrieve a message created in a previous step.",
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