# Roadmap

## Overview

The goal of this project is to build a small, production-like fullstack service with simple CRUD, using modern engineering practices. The main focus is architecture, infrastructure, code quality, observability, and AI-assisted development.

---

## Stage 0 — Planning

**Status:** ✅

### Goals

- Define project goals
- Choose the technology stack
- Prepare documentation
- Set up Cursor Rules

### Deliverables

- README
- Roadmap
- Cursor Rules

---

## Stage 1 — Monorepo

**Status:** ⬜

### Goals

- Set up Turborepo
- Set up Yarn Workspaces
- Set up shared TypeScript
- Set up ESLint and Prettier

### Deliverables

- Monorepo
- Shared configs
- Shared packages

---

## Stage 2 — Infrastructure

**Status:** ⬜

### Goals

- Set up Docker
- Set up Docker Compose
- Run PostgreSQL
- Prepare the development environment

### Deliverables

- Docker Compose
- PostgreSQL
- Environment Variables

---

## Stage 3 — Backend Foundation

**Status:** ⬜

### Goals

- Create the basic NestJS structure
- Implement Controller → Use Case → Repository architecture
- Connect Prisma
- Set up migrations

### Deliverables

- NestJS API
- Prisma
- PostgreSQL
- Health Check

---

## Stage 4 — CRUD API

**Status:** ⬜

### Goals

- Implement CRUD for Task
- Add DTOs
- Set up validation
- Document the API with Swagger

### Deliverables

- Create
- Read
- Update
- Delete
- Swagger

---

## Stage 5 — Frontend

**Status:** ⬜

### Goals

- Build the Todo List UI
- Integrate the API
- Set up TanStack Query

### Deliverables

- Create tasks
- View tasks
- Edit tasks
- Delete tasks

---

## Stage 6 — Production API

**Status:** ⬜

### Goals

- Implement pagination
- Add sorting
- Add filtering
- Unify error handling

### Deliverables

- Pagination
- Sorting
- Filtering
- Standard Error Response

---

## Stage 7 — Logging & Security

**Status:** ⬜

### Goals

- Add structured logging
- Implement a Global Exception Filter
- Study selected OWASP practices

### OWASP Focus

- Insecure Design
- Vulnerable Components
- Logging & Monitoring Failures

### Deliverables

- Pino
- Request Logging
- Error Logging
- Dependency Audit

---

## Stage 8 — Testing

**Status:** ⬜

### Goals

- Cover business logic with unit tests
- Write integration tests
- Implement E2E tests

### Deliverables

- Unit Tests
- Integration Tests
- Playwright E2E

---

## Stage 9 — Observability

**Status:** ⬜

### Goals

- Add metrics
- Visualize key indicators
- Learn OpenTelemetry

### Deliverables

- Prometheus
- Grafana
- Jaeger
- Distributed Tracing

---

## Stage 10 — CI/CD

**Status:** ⬜

### Goals

- Set up GitHub Actions
- Automate project checks
- Verify Docker builds

### Deliverables

- Lint
- Tests
- Build
- Docker Build

---

# Final Project Checklist

## Architecture

- [ ] Monorepo
- [ ] Clean project structure
- [ ] Shared packages

## Backend

- [ ] NestJS
- [ ] Prisma
- [ ] PostgreSQL
- [ ] Swagger
- [ ] Validation
- [ ] Pagination
- [ ] Filtering
- [ ] Sorting

## Frontend

- [ ] Next.js
- [ ] React
- [ ] TanStack Query

## Infrastructure

- [ ] Docker
- [ ] Docker Compose

## Quality

- [ ] ESLint
- [ ] Prettier
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] E2E Tests

## Security

- [ ] Insecure Design
- [ ] Vulnerable Components
- [ ] Logging & Monitoring Failures

## Observability

- [ ] Pino
- [ ] Prometheus
- [ ] Grafana
- [ ] OpenTelemetry
- [ ] Jaeger

## DevOps

- [ ] GitHub Actions

## AI Workflow

- [ ] Cursor Rules
- [ ] AI-assisted development
