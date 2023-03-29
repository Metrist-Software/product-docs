[Back to monitor](azurecdn.md)

# Package Specs

Description

: Monitor the observability of [Azure Content Delivery Network](https://azure.microsoft.com/products/cdn/).

Name

: `azurecdn`

Package Name

: `azurecdn`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A blob connection string.
METRIST_BLOB_STORAGE_CONNECTION_STRING=""

# (Required) A container name.
METRIST_BLOB_STORAGE_CONTAINER_NAME=""

# (Required) A file name.
METRIST_CACHE_FILE_NAME=""

# (Required) File path.
METRIST_CACHE_FILE_PATH=""

# (Required) A CDN endpoint name.
METRIST_CDN_ENDPOINT_NAME=""

# (Required) A CDN profile name.
METRIST_CDN_PROFILE_NAME=""

# (Required) An Active Directory application Id.
METRIST_CLIENT_ID=""

# (Required) A client secret associated with the application Id.
METRIST_CLIENT_SECRET=""

# (Required) A resource group name.
METRIST_RESOURCE_GROUP_NAME=""

# (Required) A GUID that identifies a subscription and underlying services.
METRIST_SUBSCRIPTION_ID=""

# (Required) A unique identifier of the Active Directory instance.
METRIST_TENANT_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azurecdn",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azurecdn",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "GetLongCachedFile",
    "description": "This step attempts to retrieve an existing file from CDN cache.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetNewFile",
    "description": "This step uploads a new file to the CDN and attempts to retrieve it from CDN cache.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "PurgeFile",
    "description": "This step attempts to purge a file uploaded in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "UpdateFile",
    "description": "This step attempts to update an existing file, then retrieve the updated version from CDN cache.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteFile",
    "description": "This step attempts to delete a file, purge the file from cache, then confirm the file no longer exists.",
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