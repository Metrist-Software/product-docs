# Past

~~1. Study https://vitepress.vuejs.org/config/introduction~~
~~1. Implement md pages from current product-docs~~
~~1. Implement Sidebar(s) (per section?) (care about prev|next links)~~
~~1. Implement 'home page'~~
~~1. Implement frontmatter: titles~~
~~1. Implement badges on headings~~
~~1. fix logo for bright theme~~
~~1. Implement custom footer~~
~~1. Implement 'last updated'~~
~~1. Implement 'Edit link'~~
~~1. add "how to know orchestrator is working" content~~
~~1. email from canarymonitor.com? (http://localhost:5173/guides/web-app-invites.html)~~

# Present

1. Make 'environment-variables' token smarter. (handle the includes content in template)

# Future

1. remove emit-all.mjs for new filenaming of manifests
1. BLOCKED: This schema is different than the api implementation: include the monitor-config spec on API page:https://github.com/Metrist-Software/backend/blob/main/lib/mix/tasks/metrist/install_monitor.ex#L107
1. Change who can submit PRs to our docs
1. https://docsearch.algolia.com/ (and get Metrist’s logo on their home page)
1. How to 'uninstall' Orchestrator (after the guided installation)
1. Implement 'team page': https://vitepress.vuejs.org/guide/theme-team-page
1. Enhance default theme: https://vitepress.vuejs.org/guide/theme-introduction
1. Improve this readme, drive people to the docs - remove docs from inside that repo ("but it'll be easier to maintain if it's IN the repo..." there's no evidence of that claim): https://github.com/Metrist-Software/orchestrator
1. Never say "just simply do ____"
1. Ryan: "We should also consider abstracting the "register your monitor" step such that we can link it from every monitor page we write. This will also be made much easier once we write the CLI."
1. Never say "this _will_ " use present tense throughout docs.

# TODO Adjustments in aws-serverless

1. as in awsecs (maybe others), these env vars should be updated to be prepended with "METRIST_" and populated by extra-config rather than process.env:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY

1. as in awsecs (maybe others), these env vars are misleading. Are they 'metrist' vars or awsecs vars?

METRIST_CLUSTER_ID (is this a metrist cluster? no, it's an AWSECS cluster but the name confuses)
METRIST_REGION (should be METRIST_AWS_REGION; or better yet METRIST_AWS_ECS_REGION)
METRIST_SECURITY_GROUP_ID
METRIST_VPC_PUBLIC_SUBNETS
