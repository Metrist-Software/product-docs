[Back to monitor](braintree.md)

# Package Specs

Description

: Tests Braintree to validate that sandbox transactions can be submitted.

Name

: `braintree`

Package Name

: `braintree`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The merchant Id to use for the sandbox transaction.
METRIST_BRAINTREE_MERCHANT_ID=""

# (Required) The public key to use for the sandbox transaction.
METRIST_BRAINTREE_PUBLIC_KEY=""

# (Required) The private key to use for the sandbox transaction.
METRIST_BRAINTREE_PRIVATE_KEY=""

# (Required) The customer Id to use for the sandbox transaction.
METRIST_BRAINTREE_CUSTOMER_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "braintree",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "braintree",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "SubmitSandboxTransaction",
    "description": "Attempts to submit a sandbox transaction.",
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