[Back to monitor](stripe.md)

# Package Specs

Description

: Tests Stripe to validate that intents can be created and confirmed and that methods can be created.

Name

: `stripe`

Package Name

: `stripe`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The API key to use.
METRIST_STRIPE_API_KEY=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "stripe",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "stripe",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateMethod",
    "description": "Creates a method on a test card.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateIntent",
    "description": "Creates an intent a test card.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "ConfirmIntent",
    "description": "Confirms an intent on a test card.",
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