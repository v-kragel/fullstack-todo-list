# Todo List

A learning fullstack project focused on **production practices**: architecture, infrastructure, testing, observability, security, and AI-assisted development.

The goal is not complex business logic, but building an application as close as possible to real production systems.

---

## Project Goals

- Build a production-like backend
- Learn NestJS
- Practice PostgreSQL and Prisma
- Set up CI/CD
- Learn Docker
- Implement observability
- Practice AI-first development with Cursor

---

## Stack

### Frontend

| Technology      | Purpose               |
| --------------- | --------------------- |
| Next.js         | App Router, SSR/SSG   |
| React           | UI                    |
| TypeScript      | Type safety           |
| TanStack Query  | Server state, caching |
| React Hook Form | Forms                 |
| Zod             | Validation            |
| Tailwind CSS    | Styling               |
| shadcn/ui       | UI components         |

### Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| NestJS     | REST API, DI, modules |
| Prisma     | ORM, migrations       |
| PostgreSQL | Database              |

### Infrastructure

| Technology     | Purpose                            |
| -------------- | ---------------------------------- |
| Docker         | Consistent development environment |
| GitHub Actions | CI/CD                              |
| Turborepo      | Monorepo                           |

### Testing

| Technology | Purpose                  |
| ---------- | ------------------------ |
| Jest       | Unit / integration tests |
| Playwright | E2E tests                |

### Observability

| Technology    | Purpose             |
| ------------- | ------------------- |
| Pino          | Structured logging  |
| Prometheus    | Metrics collection  |
| Grafana       | Visualization       |
| OpenTelemetry | Distributed tracing |
| Jaeger        | Trace inspection    |

---

## Architecture

Monorepo with separate frontend and backend.

### Overview

```
Client
  │
Next.js
  │
REST API
  │
NestJS
  │
Use Cases
  │
Repository
  │
Prisma
  │
PostgreSQL
```

### Frontend — Feature-Sliced Design (FSD)

- Layers: `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- Next.js routing in root `app/` and `pages/`, business logic in `src/`
- Rules: `.cursor/rules/frontend/`

### Backend — Clean Architecture

- Separation into domain, use cases, and infrastructure
- NestJS as the delivery layer (controllers, modules)
- Prisma isolated in the repository / infrastructure layer
- Rules: `.cursor/rules/backend/`

---

## Key Engineering Decisions

| Decision           | Why                                                |
| ------------------ | -------------------------------------------------- |
| **Turborepo**      | Learn monorepos, shared scripts, and build caching |
| **Prisma**         | Type-safe database access                          |
| **Docker**         | Consistent development environment                 |
| **GitHub Actions** | Automated checks and deployment                    |
| **OpenTelemetry**  | Learn distributed tracing                          |
| **Prometheus**     | Metrics collection                                 |
| **Pino**           | Structured logging                                 |

---

## Observability

Three pillars of observability, built in sequence:

```
Logs  →  Metrics  →  Tracing
```

| Tool              | Role                                         |
| ----------------- | -------------------------------------------- |
| **Pino**          | Structured application logs                  |
| **Prometheus**    | Metrics collection and storage               |
| **Grafana**       | Log and metrics visualization                |
| **OpenTelemetry** | Instrumentation and request trace generation |
| **Jaeger**        | Distributed call chain inspection            |

Logs answer _what happened_, metrics answer _how often and how fast_, tracing answers _how a request flowed through the system_.

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- Yarn ≥ 4
- Docker and Docker Compose

### Installation

```bash
git clone <repository-url>
cd fullstack-todo-list
yarn install
```

### Environment Variables

```bash
cp .env.example .env
```

Fill in the values in `.env` before running. Secrets are not committed to the repository.

### Run with Docker (recommended)

```bash
docker compose up -d
```

Starts PostgreSQL, backend, frontend, and observability services.

### Local Development

```bash
# infrastructure (DB, Jaeger, Prometheus, Grafana)
docker compose up -d postgres jaeger prometheus grafana

# all monorepo applications
yarn dev
```

| Service     | URL                    |
| ----------- | ---------------------- |
| Frontend    | http://localhost:3000  |
| Backend API | http://localhost:3001  |
| Grafana     | http://localhost:3002  |
| Jaeger UI   | http://localhost:16686 |
| Prometheus  | http://localhost:9090  |

> Ports and services may change as infrastructure is configured.

---

## Available Commands

Commands are run from the monorepo root via Turborepo and Yarn workspaces.

| Command            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `yarn dev`         | Start frontend and backend in development mode |
| `yarn build`       | Build all applications                         |
| `yarn lint`        | Lint                                           |
| `yarn lint:fix`    | Lint with auto-fix                             |
| `yarn typecheck`   | TypeScript check across packages               |
| `yarn test`        | Unit / integration tests (Jest)                |
| `yarn test:e2e`    | E2E tests (Playwright)                         |
| `yarn db:migrate`  | Apply Prisma migrations                        |
| `yarn db:studio`   | Open Prisma Studio                             |
| `yarn docker:up`   | Start Docker Compose                           |
| `yarn docker:down` | Stop containers                                |

Run a single package:

```bash
yarn workspace client dev
yarn workspace server dev
```

> Linting and TypeScript setup: see [ADR-0001](docs/adr/0001-eslint-typescript-monorepo.md).

---

## Project Structure

```
fullstack-todo-list/
├── .cursor/
│   └── rules/
│       ├── core/                 # Shared rules (workflow, code style, engineering)
│       ├── frontend/             # FSD, Next.js, API conventions
│       └── backend/              # Clean Architecture, NestJS, Prisma
│
├── apps/
│   ├── client/                   # Next.js frontend
│   │   ├── app/                  # Next.js App Router
│   │   ├── pages/                # Pages Router stub
│   │   └── src/                  # FSD layers
│   └── server/                   # NestJS backend
│       └── src/
│           ├── domain/
│           ├── application/      # Use cases
│           ├── infrastructure/   # Prisma, repositories
│           └── presentation/     # Controllers, modules
│
├── packages/
│   ├── eslint-config/            # Shared ESLint config (@repo/eslint-config)
│   ├── database/                 # Prisma schema, client, migrations
│   ├── shared/                   # Shared types and utilities
│   └── config/                   # ESLint, TypeScript, Tailwind configs
│
├── docs/
│   └── adr/                      # Architecture Decision Records
│
├── docker/
│   ├── docker-compose.yml
│   └── ...
│
├── .github/
│   └── workflows/                # GitHub Actions
│
├── turbo.json
├── package.json                  # Workspaces configuration
└── README.md
```

---

## Development Rules

The project uses Cursor Rules for AI-assisted development:

| Folder                    | Scope                               |
| ------------------------- | ----------------------------------- |
| `.cursor/rules/core/`     | Project-wide rules                  |
| `.cursor/rules/frontend/` | Frontend: FSD, Next.js, React Query |
| `.cursor/rules/backend/`  | Backend: Clean Architecture, NestJS |

---

## License

MIT
