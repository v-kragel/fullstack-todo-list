# ADR-0002 — Shared TypeScript Config in the Monorepo

## Status

Accepted

## Context

Monorepo with several apps (`client`, `server`). Compiler options must be shared, but Next.js and NestJS need different low-level settings.

## Where rules live

All shared compiler options are in **`packages/typescript-config`** (`@repo/typescript-config`):

| File        | Purpose                                |
| ----------- | -------------------------------------- |
| `base.json` | Strict defaults for all workspaces     |
| `node.json` | Preset for server and library packages |
| `next.json` | Preset for client                      |

Each app **`extends`** the right preset and adds only local settings (`paths`, `include`, decorators, etc.):

```json
{
  "extends": "../../packages/typescript-config/node.json",
  "compilerOptions": {
    "paths": { "@/*": ["src/*"] }
  }
}
```

**Relative path** is used instead of `@repo/typescript-config/node.json` — the IDE resolves `extends` from the app folder and does not see hoisted packages in root `node_modules`.

One shared tsconfig for the whole repo is not possible: client and server need different `module`, `moduleResolution`, `lib`, and JSX settings. Shared strict rules live in `base.json`; stack-specific options — in presets.

## Dependencies

| Where                                     | What                                                               |
| ----------------------------------------- | ------------------------------------------------------------------ |
| Each app that runs `typecheck` or `build` | `typescript` in devDependencies                                    |
| Each app with `tsconfig.json`             | `@repo/typescript-config` in devDependencies                       |
| Root `package.json`                       | `typescript` + `resolutions` to pin one version for the whole repo |

So `typescript` appears in several `package.json` files at once.

## Why the duplication

Yarn 4 treats each workspace as a **separate package**:

- Dependencies from the root are **not inherited** by apps.
- Peer dependencies (`ts-jest`, `ts-node`, etc.) expect `typescript` from the **direct consumer**, not from root.
- `tsc` looks for the binary in the **current** workspace.

Because of this, each app that typechecks must declare `typescript` itself. On disk it is still one copy (hoisting + `resolutions`) — the duplication is only in `package.json`.

## Alternatives

| Option                                           | Why not                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `tsconfig.base.json` in root                     | Easy to add, easy to forget to extend — rules drift between apps              |
| Single tsconfig for the whole monorepo           | Client and server need incompatible compiler settings                         |
| `@repo/typescript-config/node.json` in `extends` | IDE shows "file not found" when the package is hoisted to root `node_modules` |
| `typescript` only in root                        | Peer dependency warnings; `tsc` not found when running from an app            |
| `packageExtensions` in Yarn                      | Dependencies are injected silently — hard to see what a package actually uses |

## Pros

- Compiler options in one place — change `strict` once, applies everywhere
- Each app explicitly declares that it uses TypeScript
- One version across the repo via `resolutions`
- Stack-specific presets without duplicating strict defaults

## Cons

- `typescript` listed in multiple `package.json` files — versions must stay in sync manually (helped by `resolutions`)
- New app requires wiring: devDependencies, preset choice, relative `extends`
- Relative path ties tsconfig to repo folder layout
