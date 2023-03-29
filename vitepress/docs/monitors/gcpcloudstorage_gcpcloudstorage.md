[Back to monitor](gcpcloudstorage.md)

# Package Specs

Description

: Tests the GCP Cloud Storage service to validate that buckets can be created and deleted and that items can be uploaded, retrieved, and deleted.

Name

: `gcpcloudstorage`

Package Name

: `gcpcloudstorage`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The base 64 encoded credentials string to use for Cloud Storage operations.
METRIST_GCPCLOUDSTORAGE_PRIVATE_KEY=""

# (Required) The GCP project ID to use for Cloud Storage operations.
METRIST_GCPCLOUDSTORAGE_ENVIRONMENT_TAG=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "gcpcloudstorage",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "gcpcloudstorage",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateBucket",
    "description": "Creating a bucket adds the bucket to your GCP account.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "UploadObject",
    "description": "Stores a new object in a bucket.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetObject",
    "description": "Gets the object's metadata.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteObject",
    "description": "Objects are the individual pieces of data. Deleting an object removes it from the bucket.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteBucket",
    "description": "Deletes the bucket and removes the associated data from the GCP account.",
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