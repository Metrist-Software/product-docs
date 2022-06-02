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

* Path: /api/v0/monitor-status
* Verb: GET
* Status: experimental

Parameters:

* `m[]` - one or more monitors to get the status for. These should be the logical
          names for the monitors.

Returns an array of JSON objects containing logical name, display name and status for
each monitor that could be found (invalid logical names simply will not return a corresponding
object).

Example:

```
curl -H "Authorization: Bearer XXX" 'https://app.metrist.io/api/v0/monitor-status?m[]=testsignal'
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
```

### Add monitor configuration

Adds a monitor configuration.

* Path: /api/v0/monitor-config/:id
* Verb: POST
* Status: experimental

Sample request body:

```
{
  "monitor_logical_name": "asana",
  "interval_secs": 120,
  "run_groups": ["Metrist Agent"],
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

### Delete monitor configuration

Deletes a monitor configuration.

* Path: /api/v0/monitor-config/:id
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

### Values for monitor parameter

The following values are available for the `m[]` parameter(s):

**Metrist**

* `metrist` - Metrist (yes, monitor Metrist with Metrist!)

**AWS**

* `awscloudfront` - AWS Cloudfront
* `awscloudwatch` - AWS CloudWatch
* `cognito` - AWS Cognito
* `ec2` - AWS EC2
* `awsecs` - AWS ECS (Fargate)
* `awseks` - AWS EKS
* `awselb` - AWS ELB
* `awsiam` - AWS IAM
* `kinesis` - AWS Kinesis
* `awslambda` - AWS Lambda
* `awsrds` - AWS RDS
* `awsroute53` - AWS Route53
* `s3` - AWS S3
* `ses` - AWS SES
* `sqs` - AWS SQS

**Azure**

* `azureaks` - Azure AKS
* `azuread` - Azure Active Directory
* `azureappservice` - Azure App Service
* `azureblob` - Azure Blob Storage
* `azurecdn` - Azure CDN
* `azuredb` - Azure Cosmos DB
* `azuredevopsartifacts` - Azure DevOps Artifacts
* `azuredevopsboards` - Azure DevOps Boards
* `azuredevopspipelines` - Azure DevOps Pipelines
* `azuredevopsrepos` - Azure DevOps Repos
* `azuredevopstestplans` - Azure DevOps Test Plans
* `azurefncs` - Azure Functions
* `azuremonitor` - Azure Monitor
* `azuresql` - Azure SQL
* `azurevm` - Azure Virtual Machines

**Google Cloud Platform**

* `gcpcloudstorage` - GCP Cloud Storage
* `gcpcomputeengine` - GCP Compute Engine
* `gcpgke` - GCP GKE

**APIs**

* `avalara` - Avalara (AvaTax)
* `bambora` - Bambora
* `braintree` - Braintree
* `easypost` - EasyPost
* `fastly` - Fastly
* `github` - GitHub
* `gcal` - Google Calendar
* `gmaps` - Google Maps
* `hubspot` - HubSpot
* `moneris` - Moneris
* `pubnub` - PubNub
* `sendgrid` - SendGrid
* `stripe` - Stripe

**Infrastructure**

* `cloudflare` - Cloudflare
* `heroku` - Heroku
* `snowflake` - Snowflake

**SaaS**

* `authzero` - Auth0
* `circleci` - CircleCI
* `datadog` - Datadog
* `jira` - Jira
* `npm` - NPM
* `nuget` - NuGet
* `pagerduty` - PagerDuty
* `sentry` - Sentry
* `slack` - Slack
* `trello` - Trello
* `twiliovid` - Twilio Video
* `zendesk` - Zendesk
* `zoom` - Zoom
