[Back to monitor](easypost.md)

# Package Specs

Description

: Tests EasyPost to validate that addresses can be retrieved in the test and prod environments and that addresses can be verified in the prod environment.

Name

: `easypost`

Package Name

: `easypost`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) A test environment API key with access to GetAddresses.
METRIST_EASYPOST_TEST_A_P_I_Key=""

# (Required) A test environment API key with access to GetAddresses and Validate addresses.
METRIST_EASYPOST_PROD_A_P_I_Key=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "easypost",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "easypost",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "GetAddressesTest",
    "description": "Gets addresses in the test environment.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetAddressesProd",
    "description": "Gets addresses in the prod environment.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "VerifyInvalidAddress",
    "description": "Verifies addresses in the prod environment.",
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