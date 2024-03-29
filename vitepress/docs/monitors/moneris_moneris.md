[Back to monitor](moneris.md)

# Package Specs

Description

: Tests Moneris to validate that purchases and refunds work with a test credit card.

Name

: `moneris`

Package Name

: `moneris`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The store ID of the store to use.
METRIST_MONERIS_STORE_ID=""

# (Required) The API token to use.
METRIST_MONERIS_API_TOKEN=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "moneris",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "moneris",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "TestPurchase",
    "description": "Attempts a test purchase.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "TestRefund",
    "description": "Attempts a test refund.",
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