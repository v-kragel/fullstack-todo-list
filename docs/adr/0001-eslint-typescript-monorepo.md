# ADR-0001 — ESLint and TypeScript in the Monorepo

## Status

Accepted

## Context

Yarn 4 workspaces + Turborepo monorepo: `apps/client` (Next.js), `apps/server` (NestJS), `packages/eslint-config`.

We need a production-grade setup: shared ESLint rules, type-aware linting, a single `eslint`/`typescript` version across the repo, and per-package lint via Turbo.

## Decision

### ESLint

1. **`packages/eslint-config`** (`@repo/eslint-config`) is the single source of rules:
   - `base.mjs` — type-checked base + prettier + shared rules
   - `node.mjs` / `next.mjs` — factory functions for server and client
   - `shared-rules.mjs` — shared custom rules (no-any, consistent-type-imports, no enum, etc.)

2. **Apps** use a thin wrapper (3–5 lines):

   ```js
   import { createNextConfig } from "@repo/eslint-config/next";
   export default createNextConfig({ tsconfigRootDir: import.meta.dirname });
   ```

3. **`eslint` and plugins** live in `@repo/eslint-config` as dependencies; each workspace that runs `lint` also declares **`eslint`** as a devDependency.

4. **`eslint-config-next`** is only in `client` (Next.js-specific).

### TypeScript

1. **`typescript`** is explicitly listed in devDependencies of every package that runs `typecheck` or `build` (`client`, `server`).

2. **Root** holds `typescript` plus `resolutions` to pin one version across the entire dependency tree.

### Pinned versions

| Package             | Version  |
| ------------------- | -------- |
| `eslint`            | `9.39.4` |
| `typescript`        | `5.9.3`  |
| `typescript-eslint` | `8.62.1` |

All `package.json` files use **exact versions** (no `^`). Root `resolutions` enforce the same versions for transitive dependencies.

### Commands

```bash
yarn lint          # turbo lint — each package lints its own directory
yarn lint:fix
yarn typecheck
```

## Why

### Why `eslint`/`typescript` in every workspace, not only in root?

Yarn 4 treats each workspace as a **separate package**:

- **Peer deps** (`eslint-config-next`, `ts-jest`, `ts-node`) require `eslint`/`typescript` from the **direct consumer**, not from root.
- **CLI** (`eslint .`, `tsc`) resolves binaries from `node_modules/.bin` of the **current** workspace.
- Root dependencies are **not inherited** by workspaces.

On disk there is still a single copy (hoisting + `resolutions`). In `package.json` it is an explicit contract: “this package uses eslint/typescript”.

### Why rules live in `packages/eslint-config`, not in root?

- Different stacks: Next (React, a11y) vs Node (Jest globals).
- Different `tsconfig`, ignores, and `tsconfigRootDir` per package.
- Turbo caches lint per package; each workspace has its own `eslint.config.mjs`.

### Why not `packageExtensions` in `.yarnrc.yml`?

It virtually injects dependencies without writing them to `package.json`. It silences peer warnings but hides intent — bad for onboarding and code review.

### Why not `yarn run -T` everywhere?

It works for running CLI from root but does not satisfy peer dependencies and is less obvious to the team.

## Alternatives

| Option                                             | Why rejected                                               |
| -------------------------------------------------- | ---------------------------------------------------------- |
| `eslint` only in root                              | Peer warnings; `eslint .` fails to find CLI on Windows     |
| `eslint` only in `@repo/eslint-config`             | Transitive binary is not always available to the workspace |
| `packageExtensions` in `.yarnrc.yml`               | Hidden dependencies                                        |
| Single root `eslint.config` for the whole monorepo | Different tsconfig/ignores/stacks per package              |
| Yarn `catalog:`                                    | Requires Yarn ≥ 4.10; project is on 4.9.2                  |
| `tseslint.config()`                                | Deprecated; replaced with `defineConfig()`                 |

## Pros

- Transparent dependencies — visible in each `package.json`
- Single version via `resolutions` — no conflicts in `node_modules`
- DRY rules — everything in `@repo/eslint-config`
- Turbo per-package lint with caching
- Stack-specific concerns isolated (`eslint-config-next` only on client)

## Cons

- `eslint`/`typescript` appear in multiple `package.json` files (versions kept in sync manually / via `resolutions`)

## Notes

- Prettier lives in root (`prettier.config.mjs`); ESLint does not format (`eslint.format.enable: false` in VS Code).
- `@repo/eslint-config` lints itself with a simple config without type-checked rules (`.mjs` glue files).
- Remaining peer warning: `server` does not provide `webpack` for `ts-loader` (Nest CLI) — unrelated to ESLint/TypeScript.
