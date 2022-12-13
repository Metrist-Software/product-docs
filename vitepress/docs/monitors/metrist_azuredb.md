---
title: Azure Cosmos DB
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Azure Cosmos Managed Databases](https://azure.microsoft.com/solutions/databases/).

Name

: `azuredb`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) The client ID is the unique Application (client) ID assigned to your app by Azure AD when the app was registered.
METRIST_CLIENT_ID=""

# (Required) Secret string previously shared with AAD at application registration to prove the identity of the application (the client) requesting the tokens.
METRIST_CLIENT_SECRET=""

# (Required) The name of an Azure Region.
METRIST_REGION=""

# (Required) A GUID that identifies a subscription and underlying services.
METRIST_SUBSCRIPTION_ID=""

# (Required) A unique identifier of the Active Directory instance.
METRIST_TENANT_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuredb",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuredb",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateCosmosAccount",
    "description": "This step attempts to create a cosmos account, randomly named, in the given region."
  }, {
    "check_logical_name": "CreateDatabase",
    "description": "This step attempts to attach a database, randonmy named, to the cosmos account created in a previous step."
  }, {
    "check_logical_name": "CreateContainer",
    "description": "This step attempts to create a new SqlContainer in a database created in a previous step."
  }, {
    "check_logical_name": "InsertItem",
    "description": "This step attempts to insert an item in a container created in a previous step."
  }, {
    "check_logical_name": "GetItem",
    "description": "This step attempts to retrieve an item created in a previous step."
  }, {
    "check_logical_name": "DeleteItem",
    "description": "This step attempts to delete an item created in a previous step."
  }, {
    "check_logical_name": "DeleteContainer",
    "description": "This step attempts to delete a container created in a previous step."
  }, {
    "check_logical_name": "DeleteDatabase",
    "description": "This step attempts to delete a database created in a previous step."
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