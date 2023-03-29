[Back to monitor](azurevm.md)

# Package Specs

Description

: Monitor the observability of [Azure Virtual Machine service](https://azure.microsoft.com/products/virtual-machines/).

Name

: `azurevm`

Package Name

: `azurevm`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) An Active Directory application Id.
METRIST_CLIENT_ID=""

# (Required) A client secret associated with the application Id.
METRIST_CLIENT_SECRET=""

# (Required) The name of a persistent VM instance.
METRIST_PERSISTENT_INSTANCE_NAME=""

# (Required) The name of resource group associated with the given persistent instance.
METRIST_PERSISTENT_INSTANCE_RESOURCE_GROUP=""

# (Required) A GUID that identifies a subscription and underlying services.
METRIST_SUBSCRIPTION_ID=""

# (Required) A unique identifier of the Active Directory instance.
METRIST_TENANT_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azurevm",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azurevm",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateInstance",
    "description": "This step attempts to create a virtual machine instance.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "RunInstance",
    "description": "This step attempts to run a virtual machine instance created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "TerminateInstance",
    "description": "This step attempts to terminate a virtual machine instance created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DescribePersistentInstance",
    "description": "This step attempts to retrieve information about a persistent virtual machine instance.",
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