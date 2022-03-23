## Degraded and down states

Metrist will declare that a service is degraded when:

* The most recent three consecutive response times for a given check are all 500% or more above the average seen over the past seven days.

Metrist will declare that a service has recovered from a degraded state when:

* The most recent three consecutive response times for any degraded check are all below 500% of the average seen over the past seven days.

Metrist will declare that a service is down when:

* The most recent two consecutive checks have failed to get a response, or,
* A check run takes longer than 900,000 ms, (15 minutes), to complete.

Metrist will declare that a service has recovered from a down state when:

* The most recent two consecutive checks have succeeded, or,
* A check run completed after a run that timed out runs in less than 900,000 ms, (15 minutes).

## Changing the defaults

For a service monitor in aggregate, or indeed for any of a service monitor's checks, the above definitions of degraded and down can be changed to match your workloads and use cases.

Changing these values affects not only when the web UI indicates a service monitor's status, but also when you'll be notified via any alerting subscriptions you've set up.

For degraded states, you can configure the following values:

* The 500% threshold.
* The number of consecutive check runs required to change the state to degraded.
* The number of consecutive check runs required to change the state from degraded to recovered.

For down states, you can configure the following values:

* The number of consecutive check runs required to change the state to down.
* The number of consecutive check runs required to change the state from down to recovered.
* The timeout value beyond which a check run is considered to be down.

To change these, click on the service monitor you'd like to change.

1. Click on the _Thresholds_ button.
2. Make changes to the configuration items that you'd like.
3. Click on the _Save Configuration_ button.

![Configuring thresholds](https://raw.githubusercontent.com/Metrist-Software/product-docs/develop/images/threshold-configuration.png)
