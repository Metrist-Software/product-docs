[Back to monitor](kinesis.md)

# Package Specs

Description

: Monitor the observability of [Amazon Kinesis](https://aws.amazon.com/kinesis/).

Name

: `kinesis`

Package Name

: `kinesis`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your AWS access key ID
METRIST_KINESIS_AWS_ACCESS_KEY_ID=""

# (Required) The AWS region to use
METRIST_KINESIS_REGION=""

# (Required) Your AWS secret access key
METRIST_KINESIS_AWS_SECRET_ACCESS_KEY=""

# (Required) A name to apply to a Kinesis stream
METRIST_KINESIS_STREAM_NAME=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "kinesis",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "kinesis",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "WriteToStream",
    "description": "This step attempts to write streaming data using the PutRecordRequest class.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ReadFromStream",
    "description": "This step attempts to read data from the stream created in a previous step.",
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