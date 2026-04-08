# Essencium Frontend

Monorepo for the Essencium frontend framework. Provides a component library, shared types, and a Next.js boilerplate that downstream projects scaffold via [create-essencium-app](https://github.com/Frachtwerk/create-essencium-app) and then customize.

## Packages

| Package | Published | Purpose |
|---------|-----------|---------|
| `packages/app` | No (private) | Next.js boilerplate — copied by downstream projects as their starting point |
| `packages/lib` | `@frachtwerk/essencium-lib` | Component library (React, Mantine, Tailwind) |
| `packages/types` | `@frachtwerk/essencium-types` | Shared TypeScript types and Zod schemas |
| `packages/eslint-config` | `@frachtwerk/eslint-config-essencium` | Shared ESLint config |
| `packages/prettier-config` | `@frachtwerk/prettier-config-essencium` | Shared Prettier config |
| `packages/docs` | No (private) | Documentation site (Nextra) |

## Downstream projects

Multiple projects are built on top of this repo. They install `essencium-lib` and `essencium-types` as npm dependencies, and their codebase started as a copy of `packages/app` which they then customized (new pages, modified components, different config, custom API hooks).

When this repo releases a new version, downstream projects need to migrate. Migration manifests in `packages/app/manifests/` describe what changed per release. The `/author-migration` skill (in `.claude/skills/`) helps generate these manifests. A separate [migration plugin](https://github.com/Frachtwerk/essencium-frontend-migration-plugin) helps downstream projects apply the changes.

## Commands

- `pnpm build` — Build all packages
- `pnpm dev` — Run app + lib in dev mode with hot reload
- `pnpm lint` — ESLint across all packages
- `pnpm test` — Run all tests (unit + e2e)
- `pnpm test:unit` — Vitest unit tests
- `pnpm test:e2e` — Playwright e2e tests
- `pnpm format:check` / `pnpm format:write` — Prettier

## Tech stack

- **Runtime:** Node, pnpm
- **App:** Next.js, React, Mantine, Tailwind CSS, TanStack Query
- **Lib:** Rollup, React Compiler
- **Types:** Zod, Rollup
- **Testing:** Vitest, Playwright
- **Linting:** ESLint (flat config), Prettier
