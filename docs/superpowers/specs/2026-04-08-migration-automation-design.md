# Essencium Frontend Migration Automation

## Problem

Essencium-frontend is a monorepo with published npm packages (`essencium-lib`, `essencium-types`) and a private `app` package that serves as a boilerplate for downstream projects via `create-essencium-app`. Downstream projects copy the app as a starting point and then diverge as they customize pages, API hooks, configuration, and add domain-specific features.

When essencium-frontend releases a new version, downstream projects must manually migrate their customized copies. This is painful because:

- **Merge conflicts:** Downstream projects have modified the same files that changed upstream.
- **Finding what changed:** Determining which upstream app-level changes are relevant to a specific downstream project.
- **Testing:** Verifying the migration didn't break the downstream project's custom code.

There are currently 3 large downstream projects with more planned. Migration is often postponed because of the manual effort involved.

## Change Classification

Every change to essencium-frontend falls into one of 7 categories:

| # | Category | Scope | Frequency |
|---|----------|-------|-----------|
| 1 | **Dependency ecosystem migration** | Entire downstream project (all custom code using that dependency) | Rare but high-impact |
| 2 | **Infrastructure/config** | Config files + potentially broad sweeps | Occasional |
| 3 | **File tracking (modified)** | Only the downstream copy of specific upstream files | Very common |
| 4 | **New files** | Additive — new files to create | Common |
| 5 | **File removals** | Files to delete + verify no references | Occasional |
| 6 | **Translation key changes** | Merge into downstream locale JSON files | Very common |
| 7 | **Environment variable changes** | Add to `.env*` files | Occasional |

**Category 1 is fundamentally different** from categories 2-7. Categories 2-7 track upstream changes to specific files. Category 1 affects code that essencium never wrote — the downstream team's custom schemas, hooks, components, etc. (e.g., Zod v3 to v4 requires transforming all Zod usage project-wide, not just the copied essencium files).

### Examples from release history

**Category 1 — Dependency ecosystem:**
- Zod v3 to v4 (9.4.5): schema API changes, removed `UserUpdate`/`RoleUpdate` types
- TanStack Query v4 to v5 (7.0.0): `isPending` replaces `isLoading`, removed `onSuccess`/`onError` from hooks
- Mantine v6 to v7 (6.0.0): new AppShell API, `sx` to style props, CSS modules, theme object changes

**Category 2 — Infrastructure/config:**
- Tailwind CSS adoption (9.4.0): new packages, PostCSS config, globals.css
- React Compiler + Next.js 16 (9.5.0): next.config.js changes, `'use no memo'` workaround
- Next.js 15 + React 19 (7.8.0): framework upgrade via codemod

**Category 3 — File tracking:**
- AuthLayout.tsx changes (almost every release): layout refactors, new providers, feature additions
- UsersView.tsx: filter fixes, accessibility improvements, prop changes
- API hooks: auth.ts, roles.ts — new endpoints, refactored signatures

**Category 4 — New files:**
- `useScheduleTokenRenewal.ts`, `parseJwt.ts` (9.3.0)
- `mergeTranslations.ts` + test (8.1.1)
- CSS module files, route protector component

**Category 5 — File removals:**
- 13 CSS module files after Tailwind migration (9.4.0)

**Category 6 — Translation keys:**
- Accessibility translations: `table.footer.pagination.*`, `usersView.action.*`
- Feature translations: SSO support keys, feedback widget keys
- Renamed/removed keys across versions

**Category 7 — Environment variables:**
- `DEFAULT_USER_EMAIL`, `NEXT_PUBLIC_DEFAULT_USER_EMAIL` (8.1.0)
- `NEXT_PUBLIC_APP_URL` (6.1.0)

## Solution: Two-Part System

### Part 1: Migration Manifest Authoring Skill (this repo)

A Claude Code skill in the essencium-frontend repository that helps authors write `migration.yaml` files when preparing a release.

#### Manifest location

```
packages/app/manifests/
├── 9.0.0.yaml
├── 9.1.0.yaml
├── ...
└── 9.5.0.yaml
```

Lives next to `MIGRATION.md` in the app package — close to the code changes.

#### Manifest format

```yaml
version: "9.5.0"
from: "9.4.5"
date: "2026-03-10"

changes:
  # Category 1 — Dependency ecosystem
  - type: dependency_migration
    package: "next"
    from: "15.x"
    to: "16.x"
    scope: project_wide
    reference: "https://nextjs.org/docs/upgrading"
    notes: "React Compiler enabled, standalone output path changed"

  # Category 2 — Infrastructure/config
  - type: infrastructure
    description: "Enable React Compiler"
    files:
      - path: "next.config.js"
        action: modified
      - path: "package.json"
        action: modified
    notes: "Requires 'use no memo' workaround in TanStack Table components"

  # Category 3 — File tracking (modified)
  - type: file_tracking
    description: "Refactor AuthLayout for Next.js 16"
    files:
      - path: "src/components/layouts/AuthLayout.tsx"
        action: modified
    pr: "https://github.com/Frachtwerk/essencium-frontend/pull/908"

  # Category 4 — New files
  - type: new_file
    description: "Add token renewal hook"
    files:
      - path: "src/hooks/useScheduleTokenRenewal.ts"
        action: added
      - path: "src/utils/parseJwt.ts"
        action: added

  # Category 5 — File removals
  - type: file_removal
    description: "Remove CSS modules replaced by Tailwind"
    files:
      - path: "src/components/layouts/AuthLayout.module.css"
        action: removed

  # Category 6 — Translation keys
  - type: translation
    description: "Add pagination accessibility translations"
    locales: ["de", "en"]
    keys_added:
      - "table.footer.pagination.previous"
      - "table.footer.pagination.next"
    keys_removed: []
    keys_changed: []

  # Category 7 — Environment variables
  - type: env_variable
    description: "Add default user email config"
    variables:
      - name: "DEFAULT_USER_EMAIL"
        required: true
      - name: "NEXT_PUBLIC_DEFAULT_USER_EMAIL"
        required: true
```

Design decisions:
- **PR links included** — the migration skill can fetch the actual diff when it needs more context than the manifest provides.
- **No transformation rules for dependency migrations** — just the reference URL. The AI knows how to migrate Zod/Mantine/TanStack; we just tell it *that* it needs to. This avoids maintaining huge, incomplete rule sets.
- **File paths relative to the app package** — matches downstream project structure.
- **Translation keys are explicit** — surgical merge without touching custom keys.

#### Authoring skill workflow

When the essencium team prepares a release, they invoke a skill (e.g., `/author-migration`) that:

1. Diffs the app package between the previous release tag and current HEAD
2. Classifies each changed file into the 7 categories
3. Detects dependency version changes in package.json
4. Extracts added/removed/changed translation keys from locale files
5. Extracts new environment variables from `.env*` files
6. Generates a draft `migration.yaml`
7. Presents it for review and saves it

This reduces the effort of writing manifests from manual documentation to reviewing an AI-generated draft.

### Part 2: Migration Plugin (essencium-frontend-migration-plugin)

A Claude Code marketplace plugin that downstream developers install.

#### Plugin structure

```
essencium-frontend-migration-plugin/
├── package.json
├── skills/
│   └── migrate-essencium/
│       ├── skill.md              # Main migration skill
│       └── helpers/
│           ├── detect.md         # Version detection
│           ├── scan.md           # Project scanning
│           └── categories.md     # Per-category handling
├── manifests/                    # Bundled migration manifests
│   ├── 9.0.0.yaml
│   ├── 9.1.0.yaml
│   ├── ...
│   └── 9.5.0.yaml
└── README.md
```

Manifests are bundled in the plugin (not fetched remotely) so it works offline and the plugin version stays in sync with available migrations.

#### Developer experience

```bash
# One-time: install the plugin
claude install essencium-frontend-migration

# When ready to migrate
claude "/migrate-essencium"
```

#### Migration workflow

```
1. DETECT  — Read package.json to find current essencium-lib/types versions.
             Ask for target version (default: latest available in plugin).

2. FETCH   — Load migration manifests for each version step between
             current and target.

3. SCAN    — Analyze the downstream project:
             - Which essencium-origin files exist? (Determined by comparing
               file paths against the app package at the current version tag.)
             - Which of those were customized vs. untouched?
               (Diff downstream file against upstream at that version.)
             - What custom code exists (new pages, custom schemas, etc.)?

4. PLAN    — For each version step, generate a project-specific migration
             plan grouped by category. Show the plan to the developer.

5. APPLY   — Walk through changes, one category at a time, per version step.

6. VERIFY  — Run build + lint + tests after each version step.
             Fix issues before proceeding to next version.
```

#### Per-category handling

| Category | Strategy | Auto/Interactive |
|----------|----------|-----------------|
| **Dependency ecosystem** | Bump the dependency version. Fetch reference docs (or use training knowledge). Scan entire project for usage patterns of the old API. Transform all occurrences. | Interactive — developer reviews transformations |
| **Infrastructure/config** | Apply config file changes directly. These are rarely heavily customized. | Auto-apply with summary |
| **File tracking (modified)** | Fetch the upstream diff via PR link. Read the downstream file. Apply the upstream *intent* while preserving downstream customizations. The AI understands what the change does semantically, not just the text diff. | Interactive if downstream customized the file; auto if untouched |
| **New files** | Check if downstream already has an equivalent (e.g., their own token renewal hook). If not, add the file. If yes, flag for developer decision. | Auto if no equivalent exists; flag otherwise |
| **File removals** | Check if the file exists and if anything references it. Remove if safe, flag if not. | Interactive — confirm before deleting |
| **Translation keys** | Parse the downstream locale JSON. Add missing keys with upstream values. Update changed keys. Flag removed keys. Preserve all custom keys untouched. | Auto-apply additions; interactive for changes/removals |
| **Env variables** | Check `.env*` files. Add missing variables with placeholder values or defaults. | Auto-apply with summary |

#### Version-by-version execution

If a project jumps from 9.0 to 9.5, the skill runs each step sequentially:

```
9.0.0 → 9.1.0 → [verify] → 9.2.0 → [verify] → 9.3.0 → [verify] → ...
```

This avoids compounding conflicts and makes each step's changes understandable.

#### Edge cases

- **Downstream deleted an upstream file:** The manifest says to modify it but it doesn't exist. The skill flags this and asks whether the change is relevant.
- **Downstream already applied a fix:** The skill detects the change is already present and skips it.
- **Dependency migration + file tracking overlap:** e.g., Zod v4 migration changes both custom schemas and essencium-origin files. The skill handles the dependency migration first (project-wide scan), then file tracking (which may already be partially done).

## Release Workflow

When essencium-frontend publishes a new version:

1. **In essencium-frontend:** Run `/author-migration` to generate `packages/app/manifests/<version>.yaml`. Review and commit.
2. **In essencium-frontend-migration-plugin:** Copy the new manifest into `manifests/`. Bump plugin version. Publish to marketplace.

This could be automated via CI — when essencium-frontend tags a release, a workflow copies the manifest to the plugin repo and triggers a release.

## Out of Scope

- **Generating MIGRATION.md from the manifest** — could be done later but the markdown serves a different audience (human readers who may not use the plugin).
- **Automated testing of migrations** — the skill runs the downstream project's existing test suite but doesn't generate new tests.
- **Backend migrations** — this design only covers the frontend. Backend schema/API changes are a separate concern.
- **create-essencium-app updates** — the scaffolding tool always generates from the latest app package and is not affected by this system.
