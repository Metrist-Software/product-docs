# Metrist API

## Introduction

Metrist has a REST-like API that allows you to obtain things like service monitor statuses automatically.

## API keys

Authorization to the API is through API keys, which - for now - you can obtain by requesting them from us. The
key is an opaque string that you pass in through as a bearer token in an authorization header:

    Authorization: Bearer API_TOKEN_GOES_HERE

## Versioning

The API request path contains a version number that we use for major, breaking updates. Currently we have
API calls in the following versions:

* `v0` - This version is always reserved for experimental API calls that we are testing (either with customers
  or for ourselves) before making generally available. If you use v0 API calls, you must expect them to go away
  without notice as they migrate to the current major version (after a short notice period).
* `v1` - This is our current stable production version. You can expect API calls to be around for a long time,
  even if we migrate to newer versions. If we decide to deprecate API calls in stable versions, we will
  give multiple notices and ample time to move to replacement versions.

## API calls

### Get monitor statuses

Return the status of one or more monitors.

Path: /api/v0/monitor-status
Status: experimental

Parameters:
* `m[]` - one or more monitors to get the status for. These should be the logical
          names for the monitors.

Returns an array of JSON objects containing logical name, display name and status for
each monitor that could be found (invalid logical names simply will not return a corresponding
object).

Example:

```
curl -H "Authorization: Bearer XXX" 'https://app.metrist.io:4443/api/v0/monitor-status?m[]=testsignal'
```

Returns:

```
[
  {
    "monitor_logical_name": "testsignal",
    "last_checked": "2022-04-21T14:58:17.175203",
    "state": "up"
  }
]
``````
