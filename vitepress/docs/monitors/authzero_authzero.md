[Back to monitor](authzero.md)

# Package Specs

Description

: Tests Auth0 to validate that access tokens and branding can be retrieved.

Name

: `authzero`

Package Name

: `authzero`

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
  "monitor_logical_name": "authzero",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "authzero",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "GetAccessToken",
    "description": "Gets an access token using the API.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetBranding",
    "description": "Gets branding information using the API.",
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