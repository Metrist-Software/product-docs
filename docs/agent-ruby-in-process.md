# Metrist In-Process Agent

This Rails Plugin/Gem contains the Metrist In-Process Agent (IPA).

The goal of this agent is simple: all outgoing HTTP traffic gets intercepted and is sent off
to the local Metrist Orchestrator, which sifts through the data and decides what to do with it.

It is kept very simple on purpose: it will time the call, and then send some elementary
data to the host's agent per UDP. The overhead of this is in the order of microseconds,
and an UDP `send()` will not block; this way, we can be sure that your application will
not be impacted. All the heavy lifting is done in Orchestrator where it is fine
if stuff gets delayed, dropped, or whatever.

## Usage

Just installing the Gem is enough. There is some optional configuration through the environment:

* `METRIST_AGENT_HOST` sets a hostname/IP to which telemetry data is to be sent. The default
  is localhost.
* `METRIST_AGENT_PORT` sets a port through which telemetry data is to be sent. The default is port 51712.

## Rails usage

When working with Rails, you probably already have most of your configuration in `config/application.rb`. If so,
you can simply configure the Gem using:

  ```ruby
  MetristIpa.config do | c |
    c.host = "cma.prod.test.com"
    c.port = 12345
  end
  ```

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'metrist_ipa'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install metrist_ipa
```
