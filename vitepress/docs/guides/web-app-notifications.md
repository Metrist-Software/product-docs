---
title: Configure Notifications
---

# {{ $frontmatter.title }}

Notifications can be sent when a service monitor’s state changes to degraded or down, and when the service monitor recovers.

Metrist supports several notification types:

* Datadog
* Email
* PagerDuty
* Slack messages (to a channel or DM)
* Teams messages <Badge type="info" text="Contact us" />
* Webhooks

### Slack or Teams messages

To be notified via Slack or Teams, run the associated command in your [chat app](/guides/chat-apps).

### Email

To configure email notifications:

1. Click on the _Alerting_ tab.

1. Click on the _Add Subscription_ button.

1. Choose _Email_ as the _Subscription Type_, and choose the service monitor you’d like to be notified about.

1. Click the _Save Subscription_ button.

	::: info
	Email notifications can only be sent to the email address associated with your user account at this time.
	:::

	![Configuring email notifications](/images/email-notifications.png)

### Webhooks

Webhook notifications are JSON requests that are sent to an HTTP endpoint of your choice. To configure webhook notifications:

1. Click on the _Alerting_ tab.

1. Click on the _Add Subscription_ button.

1. Choose _Webhook_ as the _Subscription Type_, and choose the service monitor you’d like to be notified about.

1. Enter in the URL where you’d like to receive the webhooks in the _Url_ field.

1. Optionally, provide the _Authorization Header_ that is required to successfully deliver the webhook.

	![Configuring webhook notifications](/images/webhook-notifications.png)

#### Example Webhook Format

Here is an example webhook that demonstrates the format and available data:

```json
{
    "MonitorId": "Monitors/easypost",
    "MonitorName": "EasyPost",
    "AffectedRegions": [
        "us-east-1"
    ],
    "AffectedChecks": [
        {
            "Name": "Getting addresses in the test environment",
            "CheckId": "GetAddressesTest",
            "Instance": "us-east-1",
            "State": "degraded",
            "Message": "Getting addresses in the test environment is about 88% slower than normal from us-east-1 and is currently degraded.",
            "Current": 335,
            "Average": 377.63663873370575,
            "LastChecked": "2021-01-18T19:34:52.033Z",
            "NextCheck": "2021-01-18T19:36:52.033Z",
            "CreatedAt": "2021-01-18T19:36:20.2699061Z"
        },
        {
            "Name": "Getting addresses in the prod environment",
            "CheckId": "GetAddressesProd",
            "Instance": "us-east-1",
            "State": "degraded",
            "Message": "Getting addresses in the prod environment is about 60% slower than normal from us-east-1 and is currently degraded.",
            "Current": 173,
            "Average": 286.37150837988827,
            "LastChecked": "2021-01-18T19:34:52.033Z",
            "NextCheck": "2021-01-18T19:36:52.033Z",
            "CreatedAt": "2021-01-18T19:36:20.2714188Z"
        }
    ]
}
```
