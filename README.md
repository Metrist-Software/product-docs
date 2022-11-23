# docs.metrist.io with VitePress

---


## VitePress Docs

Visit [vitepress.vuejs.org](https://vitepress.vuejs.org).

VitePress is [VuePress](https://vuepress.vuejs.org)' spiritual successor, built on top of [vite](https://github.com/vitejs/vite).

## Running/developing on localhost

### Pre-requisites

Confirm you have `git` and `nodejs v16.10 or higher` and enable corepack: `corepack enable`.

If you have those things, skip to [next section](#rundevelop)

---

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

1. And enable corepack: it is bundled in nodejs (since v16.10) but is opt-in. It simplifies the installion of yarn.

	```sh
	corepack enable
	```

### Run/Develop

The GitHub actions script that we borrowed, used `yarn` instead of `npm`. For npm users, yarn offers familiar features.

Your first routine after cloning the repository or pulling new changes, is to run `yarn install`:

```sh
yarn install

# or just `yarn` (it does the same thing)
```

> Note: If your system complains `yarn: command not found`, remember to enable corepack: `corepack enable`. If you find yourself typing “sudo apt-get ins…” STOP. Just enable corepack — nodejs will then take care of yarn for you.

Then launch the vitepress site in develop mode (with hot-reloading, etc.):

```sh
yarn dev

# this routine will print a url to the terminal, probably http://localhost:5173
```

Open that url and modify/edit the site, confirm the  site’s contents are updated in real-time.

#### Tips

1. Sometimes (such as when vitepress tries to hot-reload your code with broken or partial syntax) the running process may stop. Vitepress will eventually solve this, but in the meantime, start dev mode again: `yarn dev`.

1. It is useful to check that the site builds (successfully) before commiting changes:

	```sh
	yarn build
	```

	You'll notice a new `dist` folder in your directory. (That folder is ignored by `.gitignore` and should not be committed.)

1. It is useful to test the site “in production mode” as follows:

	```sh
	yarn serve

	# a url will be provided such as http://localhost:8080/
	```

	The `serve` mode is mostly consistent with the `dev` mode but is served directly from the `dist` folder and therefore is useful to catch rare problems with links to static assets (such as any static files served from the `public` folder, a feature of vitepress).

## Deployment

`yarn dev` and/or `yarn build` do a reasonable job confirming things work as expected. vitepress even checks and will complain on broken links. If `yarn dev` and `yarn build` succeed, there’s a good chance your safe to publish your work.

(If this ever changes, such as we introduce custom code overriding vitepress out-of-the-box, we’ll implement `yarn test` scripts accordingly.)

To publish changes, `git push` to `main` branch. GitHub actions (see `.github/workflows/deploy.yml`) will publish your changes to GitHub pages (and we should never have to touch `gh-pages` branch).
