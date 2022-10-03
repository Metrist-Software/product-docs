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