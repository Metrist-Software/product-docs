# Manifest to Markdown Rendering

[Monitor manifests](https://assets.metrist.io/dist/monitors/manifests.json) are published as a collection, and individually in the root of each monitor’s codebase.

When `npm run dev` is executed from the root of the project, that JSON file is fetched and all [monitor docs](https://docs.metrist.io/monitors/) are rendered to the following location:

		vitepress
		└── docs
		    └── monitors


## Running/developing on localhost

To develop in this `manifests-to-markdown` workspace, the following scripts can be run from the root of the project _OR_ within this folder:

```sh
npm run test
npm run coverage
```

## Deployment

This workspace is never deployed.

Instead, the files it produces are included in the VitePress `build` script which is activated when the GitHub workflow publishes the site to `gh-pages`.
