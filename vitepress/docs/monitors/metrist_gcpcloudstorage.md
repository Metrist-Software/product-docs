---
title: GCP Cloud Storage
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Tests the GCP Cloud Storage service to validate that buckets can be created and deleted and that items can be uploaded, retrieved, and deleted.

Name

: `gcpcloudstorage`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->





<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "gcpcloudstorage",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "gcpcloudstorage",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateBucket",
    "description": "Creating a bucket adds the bucket to your GCP account."
  }, {
    "check_logical_name": "UploadObject",
    "description": "Stores a new object in a bucket."
  }, {
    "check_logical_name": "GetObject",
    "description": "Gets the object's metadata."
  }, {
    "check_logical_name": "DeleteObject",
    "description": "Objects are the individual pieces of data. Deleting an object removes it from the bucket."
  }, {
    "check_logical_name": "DeleteBucket",
    "description": "Deletes the bucket and removes the associated data from the GCP account."
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