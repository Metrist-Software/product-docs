[Back to monitor](twiliovid.md)

# Package Specs

Description

: Tests Twilio Video to validate that rooms can be joined.

Name

: `twiliovid`

Package Name

: `twiliovidclient`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The account SID to use.
METRIST_TWILIOVID_ACCOUNT_SID=""

# (Required) The auth token to use.
METRIST_TWILIOVID_AUTH_TOKEN=""

# (Required) The API key to use.
METRIST_TWILIOVID_API_KEY=""

# (Required) The API secret to use.
METRIST_TWILIOVID_API_SECRET=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "twiliovid",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "twiliovidclient",
    "run_type": "exe"
  },
  "steps": [{
    "check_logical_name": "JoinRoom",
    "description": "Joins the room using a headless Chrome browser.",
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