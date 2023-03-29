[Back to monitor](azuresql.md)

# Package Specs

Description

: Monitor the observability of [Azure SQL database service](https://azure.microsoft.com/products/azure-sql).

Name

: `azuresql`

Package Name

: `azuresql`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


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
  "monitor_logical_name": "azuresql",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuresql",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "TrackEvent",
    "description": "This step attempts to track a known type of event.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateSqlServer",
    "description": "This step attempts to create a SQL server on the given tenant.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateDatabase",
    "description": "This step attempts to create a database in a SQL server created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTable",
    "description": "This step attempts to create a table in a database created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "InsertItem",
    "description": "This step attempts to insert an item in a table created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetItem",
    "description": "This step attempts to retrieve an item inserted in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteItem",
    "description": "This step attempts to delete an item inserted in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteDatabase",
    "description": "This step attempts to delete a database created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteServer",
    "description": "This step attempts to delete a server created in a previous step.",
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