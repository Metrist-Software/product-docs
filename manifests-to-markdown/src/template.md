---
title: \[|'name|]
---

[|'name|]

# {{ $frontmatter.title }}

## Monitor Specs

Name

: `[|'logical-name|]`

Description

: [|'description|]

: &nbsp;

## Setup (In a Nutshell)

<!--@include: /parts/setup-in-a-nutshell.md-->

## Setup (Detailed Steps)

<!--@include: /parts/setup-detailed-steps-pre-requisites.md-->

### 2. Monitor Environment

<!--@include: /parts/setup-detailed-steps-2-monitor-configuration.md-->

[|'environment-variables|]

### 3. Monitor Config Registration

<!--@include: /parts/setup-detailed-steps-3-monitor-registration.md-->

```json
[|'monitor-config|]
```

Convert it to a JSON string, get your Metrist API token, and use the curl request below to register your monitor:

```sh
json= the json above converted to string

echo $json

api_token=YOUR_TOKEN

echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-api-tip.md-->

<!--@include: /parts/setup-detailed-steps-3-monitor-registration-stdout.md-->

## 4. Result

<!--@include: /parts/setup-detailed-steps-4-result.md-->
