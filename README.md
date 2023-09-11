# Fitness App



## How to start



You need to have `docker` and `docker-compose`

- Rename `.env.example` to `.env`.


- run



```sh

 docker-compose up 

```



then you can run tests



```sh

 npm test

```



## Features



- DDD architecture. Benefits: Layers that do own, specific logic, depend on an interface, not on implementation, and migrate to any technology without changing business logic.

- Documentation UI: Openapi Docs for endpoints. Simple UI generated from Openapi Docs with the ability to make requests.

- Validation. Using Openapi Docs.

- Tests: Endpoints tests for all endpoints. Client auto-generated from Openapi Docs.

- Docker: Optimized image for application. Docker-compose with database and application.

- TS-RESULT: Rust style programming - functions return `Result<Ok, Err>` that forces you to check all possible outcomes of calling the function. Exhaustive type checking, and complete error handling.

- TypeScript brand types: I use custom types for IDs (like UserId, and ProgramId). With brand types, it is hard to pass ExerciseId to ProgramId because you explicitly need to create an instance of a new type.

- Path aliases: pretty paths without "../../../" in imports



## Changes



- Node.js to `18` version: because this is the active LTS version as of 04.09.2023 (<https://nodejs.dev/en/about/releases/>). Node 12 is not supported.

- Update npm packages to the latest versions.

- Change folder structure because of DDD architecture.

- Add the 'ts-dotenv' module to load environments and type check them.

- User Prisma ORM because I am used to it)

