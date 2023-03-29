[Back to monitor](azureblob.md)

# Package Specs

Description

: Tests the Azure Blob Storage service to validate that blobs can be added, deleted, and retrieved, and that containers and storage accounts can be created.

Name

: `azureblob`

Package Name

: `azureblob`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The domain name associated with users in your Active Directory. Example: metrist.io.
METRIST_DOMAIN=""

# (Required) The client ID is the unique Application (client) ID assigned to your app by Azure AD when the app was registered. You can find the Application (Client) ID in your Azure subscription by Azure AD => Enterprise applications => Application ID.
METRIST_CLIENT_ID=""

# (Required) Secret string previously shared with AAD at application registration to prove the identity of the application (the client) requesting the tokens.
METRIST_CLIENT_SECRET=""

# (Required) Tenant ID of the Azure AD tenant or a domain associated with this Azure AD tenant, in order to sign-in a user of a specific organization only.
METRIST_TENANT_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azureblob",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azureblob",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateStorageAccount",
    "description": "Creates a storage account.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateContainer",
    "description": "Creates a container.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateBlob",
    "description": "Creates a blob in the container.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetBlob",
    "description": "Gets the blob from the container.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteBlob",
    "description": "Deletes the blob from the container.",
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