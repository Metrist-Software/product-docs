[Back to monitor](nuget.md)

# Package Specs

Description

: Tests NuGet to validate that packages can be downloaded and have their versions listed.

Name

: `nuget`

Package Name

: `nuget`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "nuget",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "nuget",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "ListVersions",
    "description": "Lists versions of a package.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "Download",
    "description": "Downloads a package.",
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