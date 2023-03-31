[Back to monitor]([|'logical_name|].md)

# Package Specs

Description

: [|'description|]

Name

: `[|'logical_name|]`

Package Name

: `[|'package_name|]`

Publisher

: [|'publisher|]

Version

: [|'version|]

: &nbsp;


<!--@include: /parts/_3.md-->


[|'config_values && <!--@include: /parts/tips_env-vars.md -->|]


<!--@include: /parts/_4.md-->


[|'monitor_config|]


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
