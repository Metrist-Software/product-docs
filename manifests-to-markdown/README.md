# Manifest file watcher for [docs.metrist.io](https://docs.metrist.io/)

---

This utility renders markdown files from monitor manifests and writes those files to the VitePress file system.

To contribute/develop in the VitePress site, see [docs.metrist.io README](../README.md) first.

To contribute/develop to this utility, see below.

---

## Installation and Setup

None required.

Basically, you should only care about this workspace to modify the watcher code or to add/edit/delete `./manifests/*.json` files.

## Development

### Running Tests

In the root of the project, `npm run test` will start vitest in watch mode. Most tests use real production code or fakes. Where a function is capable of destructive change (such as write or delete), a vitest mock is implemented to allow non-destructive development.

In the root of the project, `npm run coverage` will run vitest once with coverage reporter.

### Hot-reloading watcher.mjs

In the root of the project, `npm run manifests:dev` will start `watcher.mjs` and the `src/*.*` folder/files will be watched for changes, courtesy of `npm-watch`. This is helpful — though be aware that delete operations are very real in this mode.


## Features

All scripts related to this workspace can be activated from the root of the project. `npm run ____` commands should rarely, if ever, run from within this folder.

### Watcher

`watcher.mjs` is run when you active VitePress in dev mode in the root of this project: `npm run dev`.

This watcher is actively listening for `rename`, `delete`, and `change` events in all `./manifests/*.json` files. Those events are then emitted to the appropriate VitePress folder.

### Emit All

(Undocumented. Should be removed from the project.)

Before the above `watcher` was produced, a less sophisticated function ws written to list all *.json files in the `manifests` folder and emit all of them to the VitePress folders.
