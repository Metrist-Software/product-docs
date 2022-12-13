---
title: AWS Route53
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [AWS Route53 service](https://aws.amazon.com/route53/).

Name

: `awsroute53`

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
METRIST_AWS_ACCESS_KEY_ID=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) The ID of one of your hosted zones.
METRIST_HOSTED_ZONE_ID=""

# (Required) The hosted zone name associated with the given zone ID.
METRIST_HOSTED_ZONE_NAME=""

# (Required) One or more (as a comma-separated list) name servers associated with the given zone ID.
METRIST_HOSTED_ZONE_NS=""

# (Required) The name of an existing DNS record to query.
METRIST_PERSISTENT_RECORD_NAME=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awsroute53",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "awsroute53",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "QueryExistingDNSRecord",
    "description": "This step attempts to query an existing record on Route53 via DNS Lookup."
  }, {
    "check_logical_name": "QueryExistingDNSRecordAPI",
    "description": "This step attempts to query an existing DNS record on Route53 via the AWS SDK for JavaScript v3."
  }, {
    "check_logical_name": "CreateDNSRecord",
    "description": "This step attempts to create a DNS A record on Route53 via the AWS SDK for JavaScript v3."
  }, {
    "check_logical_name": "RemoveDNSRecord",
    "description": "This step attempts to remove a DNS A Record on Route53 via the AWS SDK for JavaScript v3."
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