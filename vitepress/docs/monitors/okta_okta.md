[Back to monitor](okta.md)

# Package Specs

Description

: Monitor the availability of Okta's M2M authentication

Name

: `okta`

Package Name

: `okta`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Okta domain to use.
METRIST_OKTA_DOMAIN=""

# (Required) The Client ID to use.
METRIST_OKTA_CLIENT_ID=""

# (Required) The Client Secret to use.
METRIST_OKTA_CLIENT_SECRET=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "okta",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "okta",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "GetToken",
    "description": "This step attempts to obtain an access token using Client ID and Client Secret.",
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