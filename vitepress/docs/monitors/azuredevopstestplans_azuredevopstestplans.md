[Back to monitor](azuredevopstestplans.md)

# Package Specs

Description

: Monitor the observability of [Azure DevOps Test Plans service](https://azure.microsoft.com/products/devops/test-plans/).

Name

: `azuredevopstestplans`

Package Name

: `azuredevopstestplans`

Publisher

: Metrist

Version

: 0.1.0-beta

: &nbsp;


<!--@include: /parts/_3.md-->


```sh
# (Required) Your Organization name as it appears in `https://dev.azure.com/{Organization}/`.
METRIST_AZUREDEVOPSTESTPLANS_ORGANIZATION=""

# (Required) A personal access token associated with your team's project board.
METRIST_AZUREDEVOPSTESTPLANS_PERSONAL_ACCESS_TOKEN=""

# (Required) Your Project key as it appears in `https://dev.azure.com/org/{Project}/`.
METRIST_AZUREDEVOPSTESTPLANS_PROJECT=""

# (Required) Your Team name as it appears in `https://dev.azure.com/org/project/{Team}/_apis/wit/wiql`.
METRIST_AZUREDEVOPSTESTPLANS_TEAM=""
```

<!--@include: /parts/tips_env-vars.md -->


<!--@include: /parts/_4.md-->


```json
{
  "monitor_logical_name": "azuredevopstestplans",
  "interval_secs": 120,
  "run_groups": [],
  "run_spec": {
    "name": "azuredevopstestplans",
    "run_type": "dll"
  },
  "steps": [{
    "check_logical_name": "CreateTestCase",
    "description": "This step attempts to create a test case in the given project.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTestPlan",
    "description": "This step attempts to create a test plan in the given project.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTestSuite",
    "description": "This step attempts to create a test suite in the given project.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "AddTestCasesToSuite",
    "description": "This step attempts to add test cases to a suite created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "CreateTestRun",
    "description": "This step attempts to create a test run of a suite created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "AddResultsToTestRun",
    "description": "This step attempts to add test results to a test run created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "GetResults",
    "description": "This step attempts to retrieve the test results produced in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteTestRun",
    "description": "This step attempts to delete a test run created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteTestPlan",
    "description": "This step attempts to delete a test plan created in a previous step.",
    "timeout_secs": 900
  }, {
    "check_logical_name": "DeleteTestCase",
    "description": "This step attempts to delete a test case created in a previous step.",
    "timeout_secs": 900
  }]
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