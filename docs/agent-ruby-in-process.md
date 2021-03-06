# Metrist In-Process Agent

This Rails Plugin/Gem contains the Metrist In-Process Agent.

The goal of this agent is simple: all outgoing HTTP traffic gets intercepted and is sent off
to the local Metrist Agent, which sifts through the data and decides what to do with it.

It is kept very simple on purpose: it will time the call, and then send some elementary
data to the host's agent per UDP. The overhead of this is in the order of microseconds,
and an UDP `send()` will not block; this way, we can be sure that your application will
not be impacted. All the heavy lifting is done in the Monitoring Agent, where it is fine
if stuff gets delayed, dropped, or whatever.

## Usage

Just installing the Gem is enough. There is some optional configuration through the environment:

* `CANARY_MONITORING_AGENT_HOST` can be set to a hostname/IP to send the telemetry data to, the default
  is to send to localhost.
* `CANARY_MONITORING_AGENT_PORT` can be set to a port to send the telemetry data to, the default is to
  sent to port 51712.

## Rails usage

When working with Rails, you probably already have most of your configuration in `config/application.rb`. If so,
you can simply configure the Gem using:

  ```ruby
  CanaryIpa.config do | c |
    c.host = "cma.prod.test.com"
    c.port = 12345
  end
  ```

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'canary_ipa'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install canary_ipa
```
