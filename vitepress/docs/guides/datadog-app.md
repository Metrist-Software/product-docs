---
title: Datadog App
---

# {{ $frontmatter.title }}

::: info
Metrist has a Datadog app that can be installed via the Datadog marketplace.

The app allows you to quickly and easily setup a number of Datadog synthetics against third party providers and it provides a simple singular health dashboard you can use to view their health.

The Datadog app does request the `Synthetic Monitoring` OAuth scopes to perform it's operations.

Metrist will have the ability to pull Synthetic test results from your Datadog account after it is installed.
:::

## Installation

1. Click on the _Integrations_ menu item.

1. Click on _Marketplace_ menu item.

1. Search for _Metrist_ using the search bar.

1. Install the app by `TBD`.

1. After the app is installed add the `Metrist Health Dashboard` widget to one of your dashboards.

1. The Metrist App will automatically open a sidebar wizard to help you setup your synthetics. To return to this wizard at any time you can use the Cog Wheel within the top right of the dashboard view which will present a _Add Monitors_ option.

1. After setting up your synthetics, you can view the Metrist synthetics by clicking the _Monitors_ menu item. You can filter to only the `metrist:created` tagged monitors to see only the Metrist monitors or you can use the following [link](https://app.datadoghq.com/monitors/manage?q=tag%253A%22metrist%253Acreated%22)

1. You will note that all the monitors have been initially setup in a paused state. To enable scheduling on the monitors you click on the monitor, then click on the
synthetic test _Name_ which will take you to the synthetic configuration. Here you can change all aspects of the synthetic test including variables, change the locations in which the synthetic will run, and update the scheduling of the synthetic. Once happy with the result you can test the synthetic by clicking the _Run Test Now_ button or resume the scheduling with the _Resume Scheduling_ button.

## Updating the Synthetic Tests

1. Go to the dashboard which contains your health dashboard.

1. Click the cog wheel in the top right of dashboard window

1. Click _Add Monitors_

1. Choose the synthetics you want to update within the wizard and complete it
