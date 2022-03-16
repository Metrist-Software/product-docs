## Configuring notifications

Notifications can be sent when a service monitor's state changes to degraded or down, and when the service monitor recovers.

Metrist supports several notification types:

* Slack or Teams messages
* Emails
* Webhooks

### Slack or Teams messages

To be notified via Slack or Teams, run the associated command in your [chat app](chat-apps.md).

### Emails

To configure email notifications:

1. Click on the _Subscriptions_ tab.
2. Click on the _Add Subscription_ button.
3. Choose _Email_ as the _Subscription Type_, and choose the service monitor you'd like to be notified about.
4. Click the _Save Subscription_ button.

**Note:** Email notifications can only be sent to the email address associated with your user account at this time.

### Webhooks

Webhook notifications are JSON requests that are sent to an HTTP endpoint of your choice. To configure webhook notifications:

1. Click on the _Subscriptions_ tab.
2. Click on the _Add Subscription_ button.
3. Choose _Webhook_ as the _Subscription Type_, and choose the service monitor you'd like to be notified about.
4. Enter in the URL where you'd like to receive the webhooks in the _Url_ field.
5. Optionally, provide the _Authorization Header_ that is required to successfully deliver the webhook.

#### Format

Here is a sample webhook that demonstrates the format and available data:

```
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
