---
title: AWS CloudFront
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of a specific [AWS Cloudfront distribution](https://aws.amazon.com/cloudfront/).

Name

: `awscloudfront`

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

# (Required) Any valid AWS Region name.
METRIST_AWS_REGION=""

# (Required) Your AWS Secret Access Key.
METRIST_AWS_SECRET_ACCESS_KEY=""

# (Required) The name of your S3 bucket.
METRIST_BUCKET=""

# (Required) The CloudFront domain name needed when linking to your objects.
METRIST_DISTRIBUTION_DOMAIN_NAME=""

# (Required) The id assigned to the distribution.
METRIST_DISTRIBUTION_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "awscloudfront",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "awscloudfront",
    "run_type": "dll",
  }
  "steps": [
    {
      "check_logical_name": "PublishFile",
      "description": "This step attemps to asynchronously put a file in an S3 bucket.",
    },
    {
      "check_logical_name": "GetNewFile",
      "description": "This step attemps to retrieve the file created in the previous step.",
    },
    {
      "check_logical_name": "UpdateFile",
      "description": "This step attemps to update the file created in the previous step.",
    },
    {
      "check_logical_name": "PurgeFile",
      "description": "This step attemps to purge items from the distribution.",
    },
    {
      "check_logical_name": "GetUpdatedFile",
      "description": "This step attemps to retrieve a file updated in a previous step.",
    },
    {
      "check_logical_name": "DeleteFile",
      "description": "This step attemps to delete the file created in a previous step.",
    },
    {
      "check_logical_name": "WaitForDeletionPropagation",
      "description": "This step attemps to confirm the DeleteFile step was successful.",
    },
  ]
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