# Local Development

A copy of the metrist site can be run locally, with sample data generated in seeds.exs. It has multiple nodes to test what happens if one node fails

## Setup

Setting up the local environment requires the following steps:
1. `docker compose up -d` to create the docker container holding your postgres db
2. `aws sso login` (requires aws account and CLI installed)
3. `make db.reset` to seed the database
4. `make run`

## Server

The local instance of metrist runs on two nodes, accessible at localhost:4443 and localhost:4444. After setting up local, they can be
initialized with make run and make run2 respectively

## Viewing docs locally

Hosting the docs locally requires docker, and at least 10GB free space and 2GB system memory.
The full instructions are here https://dev.readthedocs.io/en/latest/install.html, but summary steps below.

1. `pip install mkdocs`
2. Confirm installation with `mkdocs --version`. If an error comes up, you may need to preface this and the next command with `python -m`
3. `mkdocs serve`

The docs should be available at http://127.0.0.1:8000/