---
title: Google Drive
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Google Drive API](https://developers.google.com/drive/api/).

Name

: `googledrive`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) A Google Drive account private key.
METRIST_GOOGLE_DRIVE_ACCOUNT_PRIVATE_KEY=""

# (Required) A Google Drive account email address.
METRIST_GOOGLE_DRIVE_ACCOUNT_EMAIL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "googledrive",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "googledrive",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "CreateDocsFile",
    "description": "This step attempts to create a file.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetDocsFile",
    "description": "This step attempts to retrieve a file created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteDocsFile",
    "description": "This step attempts to delete a file created in a previous step.",
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