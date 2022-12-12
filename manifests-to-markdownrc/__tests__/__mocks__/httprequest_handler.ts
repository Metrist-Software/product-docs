import { config } from '../../src/config.mjs'
import { rest } from 'msw'

const sampleManifestsJSON = {
  "monitors": [
    {
      "description": "Tests Auth0 to validate that access tokens and branding can be retrieved.",
      "has_cleanup_tasks": false,
      "logical_name": "authzero",
      "name": "Auth0",
      "publisher": "Metrist",
      "repository": "https://docs.metrist.io/monitors/",
      "runtime_type": "dll",
      "steps": [
        {
          "description": "Gets an access token using the API.",
          "logical_name": "GetAccessToken",
          "recommended_timeout_seconds": 900
        },
        {
          "description": "Gets branding information using the API.",
          "logical_name": "GetBranding",
          "recommended_timeout_seconds": 900
        }
      ],
      "version": "0.1.0-beta"
    },
    {
      "description": "Monitor the observability of [AWS Lambda](https://aws.amazon.com/lambda/).",
      "environment_variables": [
        {
          "description": "Your AWS Access Key Id.",
          "name": "METRIST_AWS_ACCESS_KEY_ID",
          "required": true
        },
        {
          "description": "Any valid AWS Region name.",
          "name": "METRIST_AWS_REGION",
          "required": true
        },
        {
          "description": "Your AWS Secret Access Key.",
          "name": "METRIST_AWS_SECRET_ACCESS_KEY",
          "required": true
        },
        {
          "description": "The ARN identifying the location of an existing Lambda function.",
          "name": "METRIST_TEST_FUNCTION_ARN",
          "required": true
        },
        {
          "description": "The SQS Queue url to which the Lambda function sends a message.",
          "name": "METRIST_QUEUE_URL",
          "required": true
        }
      ],
      "has_cleanup_tasks": false,
      "logical_name": "awslambda",
      "name": "AWS Lambda",
      "publisher": "Metrist",
      "repository": "https://docs.metrist.io/monitors/",
      "runtime_type": "dll",
      "steps": [
        {
          "description": "This step attempts to invoke a request and send a payload from a Lambda function to a SQS Queue.",
          "logical_name": "TriggerLambdaAndWaitForResponse",
          "recommended_timeout_seconds": 900
        }
      ],
      "version": "0.1.0-beta"
    },
  ]
}

export const http_handler = [
  rest.get(config.__manifestsUrl, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(sampleManifestsJSON)
    )
  })
]
