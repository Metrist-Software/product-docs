[Back to monitor](azureappservice.md)

# Package Specs

Description

: Monitor the observability of [Azure App Service](https://azure.microsoft.com/products/app-service/).

Name

: `azureappservice`

Package Name

: `azureappservice`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A valid app host name.
METRIST_AZUREAPPSERVICE_HOST_NAME=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azureappservice",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azureappservice",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "PingService",
    "description": "This step attemps to ping Azure App Service API.",
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