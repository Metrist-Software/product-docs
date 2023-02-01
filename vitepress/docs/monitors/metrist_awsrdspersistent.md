---
title: AWS RDS Instance
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of specific [AWS RDS Instance](https://aws.amazon.com/rds/).

Name

: `awsrdspersistent`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) IP address or domain name of your RDS instance.
METRIST_AWSRDSPERSISTENT_ADDRESS=""

# (Required) Name of your database.
METRIST_AWSRDSPERSISTENT_DBNAME=""

# (Not required) Use 'postgres' or 'mysql'. If undefined, the monitor will default to mysql. [Contact us to support other engines.](https://metrist.io/contact/)
METRIST_AWSRDSPERSISTENT_ENGINE=""

# (Required) Password to access your database.
METRIST_AWSRDSPERSISTENT_PASSWORD=""

# (Required) Port number to access your database.
METRIST_AWSRDSPERSISTENT_PORT=""

# (Required) Username to access your database.
METRIST_AWSRDSPERSISTENT_USER=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsrdspersistent",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awsrdspersistent",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "PingInstance",
    "description": "This step attempts to ping your postgres or mysql RDS instance.",
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