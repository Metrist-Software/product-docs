[Back to monitor](sendgrid.md)

# Package Specs

Description

: Tests SendGrid to validate that emails can be sent.

Name

: `sendgrid`

Package Name

: `sendgrid`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) The API key to use.
METRIST_SENDGRID_API_KEY=""

# (Required) The from email address to use.
METRIST_SENDGRID_FROM_EMAIL=""

# (Required) The to email address to use.
METRIST_SENDGRID_TO_EMAIL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "sendgrid",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "sendgrid",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "SendEmail",
    "description": "Sends an email using the v3 API.",
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