# ADR-0001 — ESLint in the Monorepo

## Status

Accepted

## Context

Monorepo with several apps (`client`, `server`). ESLint rules must be shared, but each app has its own entry point for lint.

## Where rules live

All shared rules are in **`packages/eslint-config`** (`@repo/eslint-config`):

| File               | Purpose                         |
| ------------------ | ------------------------------- |
| `shared-rules.mjs` | Custom rules shared by all apps |
| `base.mjs`         | Common base config              |
| `node.mjs`         | Preset for server               |
| `next.mjs`         | Preset for client               |

Each app keeps a short **`eslint.config.mjs`** that imports the right preset:

```js
import { createNextConfig } from "@repo/eslint-config/next";
export default createNextConfig({ tsconfigRootDir: import.meta.dirname });
```

Apps do not duplicate rules — only connect to the shared package.

## Dependencies

| Where                     | What                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| `@repo/eslint-config`     | `eslint`, plugins, `typescript-eslint`, `typescript` (needed for type-aware lint) |
| Each app that runs `lint` | `eslint` in devDependencies                                                       |
| Root `package.json`       | `eslint` + `resolutions` to pin one version for the whole repo                    |

So `eslint` appears in several `package.json` files at once.

## Why the duplication

Yarn 4 treats each workspace as a **separate package**:

- Dependencies from the root are **not inherited** by apps.
- Peer dependencies expect the tool from the **direct consumer**, not from root.
- `eslint .` looks for the binary in the **current** workspace.

Because of this, each app that runs lint must declare `eslint` itself. On disk it is still one copy (hoisting + `resolutions`) — the duplication is only in `package.json`.

## Alternatives

| Option                                 | Why not                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| `eslint` only in root                  | Peer dependency warnings; CLI not found when running lint from an app           |
| `eslint` only in `@repo/eslint-config` | App cannot reliably run `eslint .` — binary not always visible to the workspace |
| `packageExtensions` in Yarn            | Dependencies are injected silently — hard to see what a package actually uses   |
| Single `eslint.config` in root         | Apps need different ignores, tsconfig paths, and stack-specific presets         |
| `yarn run -T eslint` everywhere        | Does not fix peer dependencies; less obvious for the team                       |

## Pros

- Rules in one place — change once, applies everywhere
- Each app explicitly declares that it uses lint
- One version across the repo via `resolutions`
- Stack-specific presets without duplicating custom rules

## Cons

- `eslint` listed in multiple `package.json` files — versions must stay in sync manually (helped by `resolutions`)
- New app requires wiring: devDependency + thin `eslint.config.mjs`
