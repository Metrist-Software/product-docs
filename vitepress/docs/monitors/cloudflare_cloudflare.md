[Back to monitor](cloudflare.md)

# Package Specs

Description

: Tests Cloudflare to validate that the CDN is active, that DNS entries can be looked up, and that it can be pinged.

Name

: `cloudflare`

Package Name

: `cloudflare`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Not required) The URL to use for the CDN check (defaults to https://www.cloudflare.com if not specified).
METRIST_CLOUDFLARE_CDN_CHECK_URL=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "cloudflare",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "cloudflare",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "Ping",
    "description": "Pings by requesting https://1.1.1.1/favicon.ico.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DNSLookup",
    "description": "Performs a DNS lookup.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CDN",
    "description": "Requests an asset from the CDN.",
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