---
title: Slack App Setup
---

# {{ $frontmatter.title }}

## Installation

::: info Note
Some Slack workspaces require an adminstrator to install third-party Slack applications. If your workspace is configured this way, your administrator will need to follow the steps below.
:::

1. Click on the _Profile_ menu item.

1. Click on _Install App_.

1. Click the _Add to Slack_ button.

	![Slack Install 1](/images/0001-slack.png)

1. This redirects to Slack’s application installation flow. Review the permissions and click _Allow_.

	![Slack Install 2](/images/0002-slack.png)

1. The Slack installation will be confirmed. If any errors arise, please contact [support@metrist.io](mailto:support@metrist.io).

## Slash commands

There are a number of slash commands offered in the application.

* `/metrist` Check the status of a service. you’ll be prompted to choose one from a list.
* `/metrist <monitor-name>` Check the status of a specific service..
* `/metrist <monitor-name> details` See detailed statistics about a specific service.
* `/metrist list` See high-level status of all Metrist-monitored services.
* `/metrist notifications` Configure DM notifications for service degradation and outages.
* `/metrist subscriptions #channel-name` Configure service degradation and outage notifications for a specific channel.
* `/metrist subscriptions list` See all subscriptions.
* `/metrist subscriptions list #channel-name` See all subscriptions for a specific channel.
* `/metrist help` Output available slash commands.
