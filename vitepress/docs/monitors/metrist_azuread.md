---
title: Azure Active Directory
---

# {{ $frontmatter.title }}

## Monitor Specs

Description

: Monitor the observability of [Azure Active Directory](https://azure.microsoft.com/products/active-directory).

Name

: `azuread`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_1.md-->


<!--@include: /parts/_2.md-->


<!--@include: /parts/_3.md-->


```sh
# (Required) The domain name associated with users in your Active Directory. Example: metrist.io.
METRIST_DOMAIN=""

# (Required) The client ID is the unique Application (client) ID assigned to your app by Azure AD when the app was registered. You can find the Application (Client) ID in your Azure subscription by Azure AD => Enterprise applications => Application ID.
METRIST_CLIENT_ID=""

# (Required) Secret string previously shared with AAD at application registration to prove the identity of the application (the client) requesting the tokens.
METRIST_CLIENT_SECRET=""

# (Required) Tenant ID of the Azure AD tenant or a domain associated with this Azure AD tenant, in order to sign-in a user of a specific organization only.
METRIST_TENANT_ID=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuread",
  "interval_secs": 120,
  "run_groups": ["match-one", "or-more", "run-groups"],
  "run_spec": {
    "name": "azuread",
    "run_type": "dll",
  }
  "steps": [
    {
      "check_logical_name": "Authenticate",
      "description": "This step attemps to retrieve an authentication token for a Client/Application.",
    },
    {
      "check_logical_name": "WriteUser",
      "description": "This step attemps to add a new user, randomly named, to the given domain.",
    },
    {
      "check_logical_name": "ReadUser",
      "description": "This step attemps to retrieve the user account created in a previous step.",
    },
    {
      "check_logical_name": "DeleteUser",
      "description": "This step attemps to delete the user account created in a previous step.",
    },
  ]
}
```




Convert your monitor config to a JSON string, get your Metrist API token, and use the curl request below to register your monitor:

```sh
json= the json above converted to string

echo $json

api_token=YOUR_TOKEN

echo $api_token

curl -d $json -H "Content-Type: application/json" -H "Authorization: Bearer $api_token" 'https://app.metrist.io/api/v0/monitor-config'

```

<!--@include: /parts/tips_api.md-->


<!--@include: /parts/_5.md-->


<!--@include: /parts/result.md-->