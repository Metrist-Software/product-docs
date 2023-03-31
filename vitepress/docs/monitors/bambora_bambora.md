[Back to monitor](bambora.md)

# Package Specs

Description

: Tests Bambora to validate that purchases, refunds, and voids work with a test credit card.

Name

: `bambora`

Package Name

: `bambora`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) An API key to use to perform the test transactions.
METRIST_BAMBORA_PAYMENTS_A_P_I_KEY=""

# (Required) A merchant ID to use for the test transactions.
METRIST_BAMBORA_MERCHANT_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "bambora",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "bambora",
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
  }, {
    "check_logical_name": "TestVoid",
    "description": "Attempts a test void.",
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