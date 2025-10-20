# NestJS Microservices Monorepo

This repository demonstrates how to orchestrate several NestJS microservices from a single monorepo. The project follows the practices highlighted in the accompanying presentation: a single source of truth for configuration, root-level scripts that wrap every package, npm workspaces for dependency hoisting, and a shared contract for inter-service communication. The example domain is a user registration workflow that fans out events to a mailer and a statistics collector.

## Architecture Overview

| Package | Responsibility | Default Host | Default Port |
| --- | --- | --- | --- |
| `packages/gateway` | HTTP façade that exposes the registration API and health checks while brokering requests to the microservices over TCP. | `127.0.0.1` | `8080` |
| `packages/users` | Processes registration requests, generates user IDs, and broadcasts the resulting event to other services. | `127.0.0.1` | `7073` |
| `packages/mailer` | Listens for registration events and emits "welcome" events, simulating email delivery. | `127.0.0.1` | `7071` |
| `packages/stats` | Aggregates registration and mailer events for observability. | `127.0.0.1` | `7072` |

Each service loads the same `.env` shape so the network topology can be managed without code changes. The gateway uses Nest's `ClientsModule` to register TCP clients for all microservices and exposes a minimal HTML form for manual testing. The microservices themselves also register TCP clients, which keeps the event bus symmetrical and makes it easy to emit follow-up events.

### Request & Event Flow

1. The gateway receives `POST /users/registration` requests and forwards them synchronously to the Users service via the `users.reg` pattern. The response (or any error) is returned to the HTTP client.
2. The Users service logs the payload, decorates it with a generated user ID, and emits the enriched event to both the Mailer and Stats services.
3. The Mailer service listens for `users.reg` events, logs the registration, and emits a `mailer.welcome` event that the Stats service can consume.
4. The Stats service listens for both `users.reg` and `mailer.welcome` messages to simulate analytics pipelines.

All services implement the same `healthcheck` message pattern, which lets the gateway aggregate their status at `GET /settings/healthcheck` and inspect the raw microservice results at `GET /settings/healthcheck/.del_microservices`.

## Prerequisites

- Node.js 18+ (as defined in `.nvmrc`)
- npm 9+

The repository uses npm workspaces so a single `npm install` at the root sets up every package.

## Configuration

Each package reads the following environment variables (see the sample `.env` files under `packages/*/.env`).

```dotenv
HOST=127.0.0.1         # Service bind host
PORT=7071              # Service bind port (varies per package)
MS_MAILER_HOST=127.0.0.1
MS_MAILER_PORT=7071
MS_STATS_HOST=127.0.0.1
MS_STATS_PORT=7072
MS_USERS_HOST=127.0.0.1
MS_USERS_PORT=7073
```

> Tip: copy each `.env` file to `.env.local` (or similar) before editing so that Git ignores environment-specific tweaks.

## Installation

```bash
npm install
```

The root scripts wrap the package-level commands, so you can manage the entire system without changing directories.

## Running the Services

### Start everything in watch mode

```bash
npm run start:dev
```

This command uses `concurrently` with wildcard scripts (`npm:start:dev-*`) to boot all packages together, mirroring the workflow described in the presentation.

### Start services individually

```bash
npm run start:dev-gateway
npm run start:dev-users
npm run start:dev-mailer
npm run start:dev-stats
```

Each package also exposes `start`, `start:debug`, `start:prod`, and `build` scripts if you need a specific runtime.

## Interacting with the Demo

1. Open `http://127.0.0.1:8080/` to use the built-in registration form or submit JSON directly:
   ```bash
   curl -X POST http://127.0.0.1:8080/users/registration \
     -H 'Content-Type: application/json' \
     -d '{"email":"demo@example.com","name":"Demo","password":"secret"}'
   ```
2. Inspect the aggregated health status:
   ```bash
   curl http://127.0.0.1:8080/settings/healthcheck
   ```
3. Tail the service logs to observe how events move through the system. The colorful log prefixes (`[gateway.request]`, `[users.emit]`, `[mailer.listen]`, `[stats.listen]`) make it easy to correlate the flow across consoles.

## Building & Testing

- Build the entire workspace:
  ```bash
  npm run build
  ```
- Run the gateway test suite:
  ```bash
  npm run test-e2e-gateway
  ```

Behind the scenes each package uses the same custom `build.ts` helper to clean the `dist/` folder in a cross-platform way before handing off to the Nest CLI.

## Extending the Monorepo

Because the microservices share a common `microservices-list` contract and environment conventions, adding a new package is mostly a matter of:

1. Duplicating an existing package structure.
2. Registering the service in `microservices-list.ts` (or the generated artifacts referenced by the microservices).
3. Providing package-level scripts so that the root wildcard commands pick it up automatically.

This setup keeps the development experience cohesive while still letting each service evolve independently, which was the central theme of the original presentation.
