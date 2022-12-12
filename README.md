# [docs.metrist.io](https://docs.metrist.io/) with VitePress

---

Online at [https://docs.metrist.io](https://docs.metrist.io/)

---

## Metrist Docs with VitePress & Manifest JSON

### VitePress

Visit [VitePress.vuejs.org](https://VitePress.vuejs.org). VitePress is [VuePress](https://vuepress.vuejs.org)' spiritual successor, built on top of [vite](https://github.com/vitejs/vite).

Helpful [VitePress guide for Markdown](https://vitepress.vuejs.org/guide/markdown).

### Manifest JSON

[Monitor manifests](https://assets.metrist.io/dist/monitors/manifests.json) are published as a collection, and individually in the root of each monitor’s codebase.

The collection of manifests is used in this repository to render all [monitor docs](https://docs.metrist.io/monitors/). See the [README](manifests-to-markdown/README.md) for more.

## Running/developing on localhost

### Pre-requisites

Confirm you have `git`, `npm`, and `nodejs v16.10 or higher`.

```sh
git --version
node --version
npm --version #npm is bundled with node, you should NOT have to install it separately

# you should see something like:
#   git version 2.34.1
#   8.19.2
#   v18.12.0
```

If you have those things, continue reading.

If you do not have those things, see the guided setup instructions [next section](#guided-setup-of-pre-requisites)

### Run/Develop

Your first routine after cloning the repository or pulling new changes, is to run `npm install`:

```sh
npm install
```

Then launch the VitePress site in develop mode (with hot-reloading, etc.):

```sh
npm run dev

# this routine will print a url to the terminal, probably http://localhost:5173
```

Open that url and modify/edit the site, confirm the site’s contents are updated in real-time.

#### Important to Know

::: info
Adjacent to the VitePress workspace in this repo is a purpose-built templater of [monitor manifests](https://assets.metrist.io/dist/monitors/manifests.json). VitePress and this utility, called `manifests-to-markdown`, are both started with the `npm run dev` command — therefore, this utility run silently while VitePress is in dev mode.
:::

##### Why is this important?

1. All files called `metrist_*.md` in the `monitors` folder are produced by the `manifests-to-markdown` utility.

		vitepress
		└── docs
		    └── monitors

1. It is not productive to edit those files. They are written each time the manifests are collected via `npm run dev`.

#### Tips

1. VitePress supports the notion of _file @includes_. These snippets are stored in a folder called `parts` under each main folder tree:

		├── docs
		│   ├── guides
		│   │   ├── parts
		│   ├── monitors
		│   │   ├── parts
		│   ├── tools
		└── └── └── parts

	When editing the included files (the “parts”), they appear to not hot-reload in `dev` mode. You may need to restart VitePress: `npm run dev`. (This is likely to be fixed by VitePress.)

1. Sometimes (such as when VitePress tries to hot-reload your code with broken or partial syntax) the running process may stop. VitePress will eventually solve this, but in the meantime, start dev mode again: `npm run dev`.

1. It is useful to check that the site builds (successfully) before commiting changes:

	```sh
	npm run build
	```

	You'll notice a new `dist` folder in your directory. (That folder is ignored by `.gitignore` and should not be committed.)

1. It is useful to test the site “in production mode” as follows:

	```sh
	npm run serve

	# a url will be provided such as http://localhost:8080/
	```

	The `serve` mode is mostly consistent with the `dev` mode but is served directly from the `dist` folder and therefore is useful to catch rare problems with links to static assets (such as any static files served from the `public` folder, a feature of VitePress).

### Guided Setup of Pre-requisites

If you don’t have those things, here’s a guided setup:

1. Confirm you have `git`:

	```sh
	git --version

	# should output something like `git version 2.34.1`
	```

1. Get the code. Clone the repository into a folder in your preferred location:

	```sh
	git clone https://github.com/Metrist-Software/product-docs.git
	```

1. Move into the root of the project. cd into that new folder:

	```sh
	cd product-docs
	```

1. Check if you have `node` (version 16 or higher; the GitHub actions suggest v18):

	```sh
	node --version

	# should output something like `node version v18.12.0`
	```

	If you don't have nodejs available in the system, install it in your preferred way. Go to [nodejs.org](https://nodejs.org/en/download/), nvm, or use `asdf-vm` as follows:

	Check if you have `asdf`:

	```sh
	asdf --version

	# should output something like v0.10.2-etc
	```

	Add the nodejs plugin for asdf:

	```sh
	asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
	```

	Then (remember, we're in the project’s root folder),install a nodejs version of your choice (recommended v18 or higher, and a minimum of v16.10):

	```sh
	asdf install nodejs latest
	```

	Or add to your `.tool-versions` file:

	```sh
	# add to .tool-versions
	nodejs 18.12.0
	```

	And run `asdf install`.

	Confirm nodejs is available:

	```sh
	node --version

	# should output something like `node version v18.12.0`
	```

## Deployment

`npm run dev` and/or `npm run build` do a reasonable job confirming things work as expected. VitePress will even complain on broken links. If `npm run dev` and `npm run build` succeed, there’s a good chance your safe to publish your work.

(If this ever changes, such as we introduce custom code overriding VitePress out-of-the-box, we’ll implement `npm run test` scripts accordingly.)

To publish changes, `git push` to `main` branch. GitHub actions (see `.github/workflows/deploy.yml`) will publish your changes to GitHub pages (and we should never have to touch `gh-pages` branch).
