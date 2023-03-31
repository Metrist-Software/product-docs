[Back to monitor](testsignal.md)

# Package Specs

Description

: This monitor just sends a test signal through the system so we can verify that things are correctly working.

Name

: `testsignal`

Package Name

: `testsignal`

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
  "monitor_logical_name": "testsignal",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "testsignal",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "Zero",
    "description": "Always returns a zero measurement.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "Normal",
    "description": "Returns a normal-distributed number from the distribution (μ=10.0, σ=2.0).",
    "timeout_secs": 900
  }, {
    "check_logical_name": "Poisson",
    "description": "Returns a sample from a Poisson distributed random variable.",
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