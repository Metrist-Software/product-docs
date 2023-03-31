[Back to monitor](gmaps.md)

# Package Specs

Description

: Tests Google Maps to validate that directions and static images can be retrieved and that geocoding from a physical address works as expected.

Name

: `gmaps`

Package Name

: `gmaps`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Google maps API key with access to Directions, Static Map Images, and Geocoding.
METRIST_GMAPS_API_KEY=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "gmaps",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "gmaps",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "GetDirections",
    "description": "Gets directions.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetStaticMapImage",
    "description": "Gets a static image.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetGeocodingFromAddress",
    "description": "Gets gecoding from an address.",
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