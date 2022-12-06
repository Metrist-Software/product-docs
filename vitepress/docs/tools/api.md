---
title: Metrist API
---

# {{ $frontmatter.title }} <Badge type="warning" text="beta" />

## Introduction

Metrist has a REST-like API that allows you to obtain things like service monitor statuses automatically.

## API keys

Authorization to the API is through your API key, which you can get from https://app.metrist.io/profile. The key is an opaque string that you pass in through as a bearer token in an authorization header:

```
Authorization: Bearer API_TOKEN_GOES_HERE
```

## Versioning

The API request path contains a version number that we use for major, breaking updates. Currently we have API calls in the following versions:

* `v0`

	This version is always reserved for experimental API calls that we are testing (either with customers or for ourselves) before making generally available. If you use v0 API calls, you must expect them to go away without notice as they migrate to the current major version (after a short notice period).

* `v1`

	This is our current stable production version. You can expect API calls to be around for a long time, even if we migrate to newer versions. If we decide to deprecate API calls in stable versions, we will give multiple notices and ample time to move to replacement versions.

## API Calls

### Get Monitor Status <Badge type="warning" text="experimental" />

Return the status of one or more monitors.

* Path: `/api/v0/monitor-status`
* Verb: GET
* Status: experimental

Parameters:

* `m[]`

	One or more monitors to get the status for. These should be the logical names for the monitors. These names may be monitors you have created or any of the [monitors in Metrist’s library](/monitors/).

	Returns an array of JSON objects containing logical name, display name and status for each monitor that could be found (invalid logical names simply will not return a corresponding object).

	Example:

	```sh
	curl -H "Authorization: Bearer XXX" 'https://app.metrist.io/api/v0/monitor-status?m[]=testsignal'
	```

	Returns:

	```json
	[
		{
			"monitor_logical_name": "testsignal",
			"last_checked": "2022-04-21T14:58:17.175203",
			"state": "up"
		}
	]
	```

#### Values for Monitor Parameter

The following values are available for the `m[]` parameter(s): see [Monitor Library](/monitors/).

### Add Monitor Configuration

Adds a monitor configuration.

* Path: `/api/v0/monitor-config/`
* Verb: POST
* Status: experimental

Sample request body:

```
{
  "monitor_logical_name": "asana",
  "interval_secs": 120,
  "run_groups": ["Metrist Orchestrator"],
  "run_spec": {
    "name": "asana",
    "run_type": "dll"
  },
  "steps": [
    {
      "check_logical_name": "Ping",
      "timeout_secs": 900
    }
  ]
}
```

Returns the ID of the MonitorConfig object.

Example:

```
curl -d $JSON -H "Content-Type: application/json" -H "Authorization: Bearer XXX" 'https://app.metrist.io/api/v0/monitor-config'
```

Returns:

```
11y9YlrWxXf39mRWIrhFtPl
```

### Delete Monitor Configuration

Deletes a monitor configuration.

* Path: `/api/v0/monitor-config/:id`
* Verb: DELETE
* Status: experimental

Example:

```
curl -X DELETE -H "Authorization: Bearer XXX" 'https://app.metrist.io/api/v0/monitor-config/asana/11y9YlrWxXf39mRWIrhFtPl'
```

Returns:

```
OK
```
