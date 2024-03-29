# Capy Cloud backend

This is the backend of the **CapyCloud** project

## Installation

- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Clone this repository `git clone https://github.com/Capyton/capy-cloud-backend.git`
- Init mainnet or testnet config `./global_configs/init.sh mainnet` or `./global_configs/init.sh testnet`
- Copy `.env.template` to `.env` and fill it with your data
- Run `docker-compose up -d` to start the project

If you want to get your public IP for `.env` file, you can run `./get-public-ip.sh`

## Endpoints

### Swagger

Path: `/swagger`

## Dependencies

### Infrastructure

- [Postgres](https://www.postgresql.org/docs/current/index.html) — Database
- [Docker](https://docs.docker.com/) — For deployment
- [Storage daemon](https://ton.org/docs/participate/ton-storage/storage-daemon) - For storing data

### Key **TypeScript** libraries

- [NestJS](https://docs.nestjs.com/) — Web framework
- [TypeORM](https://typeorm.io/#/) — ORM for working with database
- [tonstorage-cli](https://github.com/ndatg/tonstorage-cli/) — CLI for working with storage daemon
