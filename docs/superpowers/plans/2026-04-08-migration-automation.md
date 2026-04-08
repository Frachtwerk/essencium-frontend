# Migration Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-part AI-powered migration system: a manifest authoring skill for the essencium-frontend team, and a Claude Code marketplace plugin that downstream projects install to automate version migrations.

**Architecture:** Migration manifests (YAML) describe what changed per release. An authoring skill generates manifest drafts by diffing git tags. A marketplace plugin consumes manifests and applies changes to downstream projects interactively, using the AI's understanding of code semantics to handle customized files.

**Tech Stack:** Claude Code skills (Markdown), YAML manifests, Git diffing, Claude Code plugin system

**Spec:** `docs/superpowers/specs/2026-04-08-migration-automation-design.md`

---

## File Structure

### essencium-frontend (this repo)

```
packages/app/manifests/
├── 9.4.5.yaml                    # Sample manifest — Zod v4 migration
└── 9.5.0.yaml                    # Sample manifest — React Compiler + Next.js 16

skills/
└── author-migration/
    └── SKILL.md                  # Authoring skill for generating manifests
```

### essencium-frontend-migration-plugin (separate repo)

```
essencium-frontend-migration-plugin/
├── .claude-plugin/
│   └── plugin.json               # Plugin metadata
├── skills/
│   └── migrate-essencium/
│       ├── SKILL.md              # Main migration skill (user-invocable as /migrate-essencium)
│       └── references/
│           ├── categories.md     # Per-category handling strategies
│           └── manifest-format.md # Manifest schema reference
├── manifests/
│   ├── 9.4.5.yaml               # Copied from essencium-frontend
│   └── 9.5.0.yaml               # Copied from essencium-frontend
├── LICENSE
└── README.md
```

---

## Phase 1: Migration Manifests (essencium-frontend repo)

### Task 1: Create manifest directory and write 9.4.5 manifest (Zod v4)

This manifest covers a Category 1 (dependency ecosystem) change — the hardest kind. It validates the manifest format against a real-world case.

**Files:**
- Create: `packages/app/manifests/9.4.5.yaml`

- [ ] **Step 1: Create the manifests directory**

```bash
mkdir -p packages/app/manifests
```

- [ ] **Step 2: Analyze the 9.4.5 changes**

Review the git diff between tags `essencium-app-v9.4.4` and `essencium-app-v9.4.5` to capture all changes in the app package. Cross-reference with the MIGRATION.md entry for 9.4.5.

```bash
git diff essencium-app-v9.4.4..essencium-app-v9.4.5 -- packages/app/
```

Also check package.json changes for dependency version bumps:

```bash
git diff essencium-app-v9.4.4..essencium-app-v9.4.5 -- packages/app/package.json
```

And translation key changes:

```bash
git diff essencium-app-v9.4.4..essencium-app-v9.4.5 -- packages/app/public/locales/
```

- [ ] **Step 3: Write the 9.4.5 manifest**

Create `packages/app/manifests/9.4.5.yaml` based on the diff analysis. The manifest must include:

- `dependency_migration` entry for Zod v3 to v4 with `scope: project_wide` and reference to the Zod v4 changelog
- `file_tracking` entries for each modified app file, with PR link to #911
- `translation` entries for any changed locale keys (from the Zod config changes)
- Any `env_variable` or `new_file` entries if applicable

Use the manifest format from the design spec. Every file path must be relative to the app package root (e.g., `src/api/users.ts`, not `packages/app/src/api/users.ts`).

- [ ] **Step 4: Validate the manifest is valid YAML**

```bash
python3 -c "import yaml; yaml.safe_load(open('packages/app/manifests/9.4.5.yaml'))" && echo "Valid YAML"
```

- [ ] **Step 5: Commit**

```bash
git add packages/app/manifests/9.4.5.yaml
git commit -m "chore: add migration manifest for v9.4.5 (Zod v4)"
```

### Task 2: Write 9.5.0 manifest (React Compiler + Next.js 16)

This manifest covers Categories 2 (infrastructure) and 3 (file tracking) — validates the format for non-ecosystem changes.

**Files:**
- Create: `packages/app/manifests/9.5.0.yaml`

- [ ] **Step 1: Analyze the 9.5.0 changes**

```bash
git diff essencium-app-v9.4.5..essencium-app-v9.5.0 -- packages/app/
```

Check dependency changes, translation changes, and env variable changes the same way as Task 1.

- [ ] **Step 2: Write the 9.5.0 manifest**

Create `packages/app/manifests/9.5.0.yaml`. This should include:

- `dependency_migration` entries for Next.js 15→16 and React 18→19 if applicable
- `infrastructure` entries for React Compiler enablement, next.config.js changes
- `file_tracking` entries for each modified file with PR link to #908
- Any `translation`, `env_variable`, `new_file`, or `file_removal` entries

- [ ] **Step 3: Validate YAML**

```bash
python3 -c "import yaml; yaml.safe_load(open('packages/app/manifests/9.5.0.yaml'))" && echo "Valid YAML"
```

- [ ] **Step 4: Commit**

```bash
git add packages/app/manifests/9.5.0.yaml
git commit -m "chore: add migration manifest for v9.5.0 (React Compiler + Next.js 16)"
```

---

## Phase 2: Authoring Skill (essencium-frontend repo)

### Task 3: Create the `/author-migration` skill

This skill is invoked by the essencium team when preparing a release. It diffs git tags, classifies changes, and generates a manifest draft.

**Files:**
- Create: `skills/author-migration/SKILL.md`

- [ ] **Step 1: Create the skill directory**

```bash
mkdir -p skills/author-migration
```

- [ ] **Step 2: Write the skill**

Create `skills/author-migration/SKILL.md` with the following structure:

```markdown
---
name: author-migration
description: "Generate a migration manifest (YAML) for a new essencium-frontend release. Use when preparing a release to document app-level changes for downstream projects."
argument-hint: "[version]"
---
```

The skill body must instruct the AI to:

1. **Determine versions:** Accept an optional version argument. If not provided, read the current version from `packages/app/package.json`. Find the previous release tag by listing `git tag --list 'essencium-app-v*' --sort=-v:refname` and picking the second entry.

2. **Diff the app package:** Run `git diff <previous-tag>..HEAD -- packages/app/` (or between two tags if both are specified). Focus only on the `packages/app/` directory.

3. **Classify changes into 7 categories:**
   - Check `packages/app/package.json` dependency changes → `dependency_migration` entries
   - Check config files (next.config.js, postcss.config.cjs, tsconfig.json) → `infrastructure` entries
   - Check `packages/app/public/locales/` → `translation` entries (diff JSON keys)
   - Check `.env*` files → `env_variable` entries
   - Check for added files → `new_file` entries
   - Check for deleted files → `file_removal` entries
   - All other modified files → `file_tracking` entries

4. **Find PR links:** Run `git log <previous-tag>..HEAD --oneline -- packages/app/` and extract PR references from commit messages.

5. **Generate the manifest YAML** following the format in the design spec. Save to `packages/app/manifests/<version>.yaml`.

6. **Present for review** and ask the author to verify before committing.

The skill must reference the manifest format. Include the full YAML schema inline in the skill (do not reference external files that may not exist in the user's checkout).

- [ ] **Step 3: Test the skill by invoking it**

In the essencium-frontend repo, run:

```bash
claude "/author-migration 9.5.0"
```

Verify it produces a manifest similar to the hand-written `9.5.0.yaml` from Task 2. Compare the output and fix any issues in the skill.

- [ ] **Step 4: Commit**

```bash
git add skills/author-migration/SKILL.md
git commit -m "feat: add /author-migration skill for generating migration manifests"
```

---

## Phase 3: Migration Plugin Setup (essencium-frontend-migration-plugin repo)

### Task 4: Initialize the plugin repository

**Files:**
- Create: `.claude-plugin/plugin.json`
- Create: `LICENSE`
- Create: `README.md`

- [ ] **Step 1: Clone and set up the repo**

```bash
cd /tmp
git clone git@github.com:Frachtwerk/essencium-frontend-migration-plugin.git
cd essencium-frontend-migration-plugin
```

- [ ] **Step 2: Create the plugin metadata**

Create `.claude-plugin/plugin.json`:

```json
{
  "name": "essencium-frontend-migration",
  "description": "Automated migration tool for projects built on essencium-frontend. Analyzes upstream changes, detects downstream customizations, and applies version-by-version migrations interactively.",
  "version": "0.1.0",
  "author": {
    "name": "Frachtwerk GmbH"
  },
  "homepage": "https://github.com/Frachtwerk/essencium-frontend-migration-plugin",
  "repository": "https://github.com/Frachtwerk/essencium-frontend-migration-plugin",
  "license": "MIT",
  "keywords": [
    "essencium",
    "migration",
    "frontend",
    "upgrade"
  ]
}
```

- [ ] **Step 3: Create the LICENSE file**

Use the MIT license (matching essencium-frontend). Include `Copyright (c) 2026 Frachtwerk GmbH`.

- [ ] **Step 4: Create README.md**

Write a README covering:
- What the plugin does (one paragraph)
- Installation: `claude install essencium-frontend-migration`
- Usage: `claude "/migrate-essencium"`
- What it automates (the 7 change categories, briefly)
- Link to essencium-frontend repo

- [ ] **Step 5: Create directory structure**

```bash
mkdir -p skills/migrate-essencium/references
mkdir -p manifests
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: initialize plugin structure"
```

### Task 5: Copy manifests into the plugin

**Files:**
- Create: `manifests/9.4.5.yaml`
- Create: `manifests/9.5.0.yaml`

- [ ] **Step 1: Copy manifests from essencium-frontend**

```bash
cp /var/home/frank/Projects/essencium/essencium-frontend/packages/app/manifests/*.yaml manifests/
```

- [ ] **Step 2: Validate both manifests**

```bash
for f in manifests/*.yaml; do python3 -c "import yaml; yaml.safe_load(open('$f'))" && echo "$f: valid"; done
```

- [ ] **Step 3: Commit**

```bash
git add manifests/
git commit -m "chore: add migration manifests for v9.4.5 and v9.5.0"
```

---

## Phase 4: Migration Skill (essencium-frontend-migration-plugin repo)

### Task 6: Create the category reference document

This reference is read by the main skill to understand how to handle each change category. Keeping it separate keeps the main skill focused on workflow.

**Files:**
- Create: `skills/migrate-essencium/references/categories.md`

- [ ] **Step 1: Write categories.md**

Create `skills/migrate-essencium/references/categories.md` with detailed handling instructions for each of the 7 categories:

**Category 1 — Dependency ecosystem migration:**
- Bump the dependency version in the downstream project's package.json
- Fetch the reference URL from the manifest (use WebFetch if available, otherwise rely on training knowledge)
- Scan the entire downstream project for usage patterns of the old API (use Grep)
- For each file with old usage, read the file, understand the context, and transform to the new API
- Present each transformed file to the developer for review before applying
- After all transformations, run the package manager install command

**Category 2 — Infrastructure/config:**
- Read the manifest's file list and notes
- For each config file: read the downstream version, fetch the upstream diff via PR link, apply changes
- These files are rarely customized so apply directly with a summary
- If the downstream file has unexpected customizations, flag for review

**Category 3 — File tracking (modified):**
- For each file in the manifest entry:
  - Check if the file exists in the downstream project
  - If it doesn't exist: the downstream project deleted it — flag and ask if the change is relevant
  - If it exists: fetch the upstream diff via the PR link. Read the downstream file. Apply the upstream change intent while preserving downstream customizations.
  - If the downstream file is identical to the previous upstream version: apply the diff directly (auto)
  - If the downstream file was customized: apply interactively — show what the upstream changed and how it conflicts with customizations

**Category 4 — New files:**
- For each file in the manifest entry:
  - Check if the downstream project already has a file at that path
  - If not: fetch the file content from the essencium-frontend repo at the target version tag, create it
  - If yes: the downstream project already has something there — flag for review
  - Also search for files with similar names/functionality (the downstream team may have created their own version elsewhere)

**Category 5 — File removals:**
- For each file in the manifest entry:
  - Check if the file exists in the downstream project
  - If it doesn't exist: skip (already removed or never existed)
  - If it exists: search for imports/references to this file across the project. If none found, confirm deletion. If references exist, flag for review.

**Category 6 — Translation keys:**
- For each locale in the manifest entry:
  - Read the downstream project's locale JSON file
  - For `keys_added`: add them if they don't already exist. Preserve all existing custom keys.
  - For `keys_changed`: update the value if the downstream project hasn't customized it. Flag if customized.
  - For `keys_removed`: flag for review (the downstream project may still use them)
  - Write the updated JSON, preserving key ordering

**Category 7 — Environment variables:**
- For each variable in the manifest entry:
  - Check all `.env*` files in the downstream project
  - If the variable already exists: skip
  - If missing: add it with a `TODO: set value` placeholder
  - If the manifest specifies a default value, use that instead

- [ ] **Step 2: Commit**

```bash
git add skills/migrate-essencium/references/categories.md
git commit -m "docs: add per-category migration handling reference"
```

### Task 7: Create the manifest format reference

**Files:**
- Create: `skills/migrate-essencium/references/manifest-format.md`

- [ ] **Step 1: Write manifest-format.md**

Create `skills/migrate-essencium/references/manifest-format.md` documenting the YAML schema:

- Top-level fields: `version`, `from`, `date`, `changes`
- Each change entry's `type` field and its allowed values: `dependency_migration`, `infrastructure`, `file_tracking`, `new_file`, `file_removal`, `translation`, `env_variable`
- Required and optional fields per type
- One complete example manifest (use a simplified version of the 9.4.5 manifest)

- [ ] **Step 2: Commit**

```bash
git add skills/migrate-essencium/references/manifest-format.md
git commit -m "docs: add manifest format reference"
```

### Task 8: Create the main `/migrate-essencium` skill

This is the core skill that downstream developers invoke. It orchestrates the entire migration workflow.

**Files:**
- Create: `skills/migrate-essencium/SKILL.md`

- [ ] **Step 1: Write the skill**

Create `skills/migrate-essencium/SKILL.md` with frontmatter:

```markdown
---
name: migrate-essencium
description: "Migrate an essencium-frontend based project to a newer version. Detects current version, analyzes customizations, and applies upstream changes interactively. Use when upgrading @frachtwerk/essencium-lib or @frachtwerk/essencium-types."
argument-hint: "[target-version]"
---
```

The skill body must define this workflow:

**1. DETECT**
- Read the downstream project's `package.json` to find installed versions of `@frachtwerk/essencium-lib` and `@frachtwerk/essencium-types`
- Accept an optional target version argument. Default to the latest version available in the plugin's `manifests/` directory.
- List all available manifest files by globbing the plugin's `manifests/` directory
- Calculate the version path: from current → target, one step at a time
- Present the migration path to the developer and ask for confirmation:
  ```
  Current: @frachtwerk/essencium-lib@9.2.0
  Target: 9.5.0
  Migration path: 9.3.0 → 9.4.0 → 9.4.4 → 9.4.5 → 9.5.0
  Proceed? (y/n)
  ```
- If a manifest is missing for an intermediate version, skip that version (not all versions have breaking changes)

**2. For each version step, execute in order:**

**2a. LOAD manifest**
- Read the manifest YAML for this version step from the plugin's `manifests/` directory
- Parse and group changes by type
- Read the `references/categories.md` file for handling instructions

**2b. PLAN**
- For each change in the manifest, assess the downstream project:
  - Does the file exist? Was it customized? (To detect customization: fetch the file from the essencium-frontend GitHub repo at the `from` version tag via WebFetch, e.g., `https://raw.githubusercontent.com/Frachtwerk/essencium-frontend/essencium-app-v<from-version>/packages/app/<path>`, and compare with the downstream file. If they differ, the downstream project customized it.)
  - For dependency migrations: scan for usage of the affected library
- Present a summary to the developer:
  ```
  Version 9.4.5 migration plan:
  - [dependency] Zod v3 → v4: found 23 files with Zod usage
  - [file_tracking] src/api/users.ts: customized (3 added functions)
  - [file_tracking] src/hooks/useZodForm.ts: file removed by downstream
  - [translation] 4 keys to add to de/en locale files
  - [env_variable] 0 new variables
  ```
- Ask the developer to confirm before applying

**2c. APPLY**
- Process changes in this order (dependencies first, then structural, then content):
  1. `dependency_migration` (project-wide scan and transform)
  2. `infrastructure` (config files)
  3. `file_removal` (remove before adding to avoid conflicts)
  4. `new_file` (add new files)
  5. `file_tracking` (modify existing files)
  6. `translation` (merge translation keys)
  7. `env_variable` (add missing variables)
- Follow the handling strategies in `references/categories.md`
- For interactive changes: show the proposed change and wait for approval
- For auto changes: apply and show a summary

**2d. VERIFY**
- Run the downstream project's build command (detect from package.json scripts — typically `npm run build` or `pnpm build`)
- Run the linter if available (`npm run lint`)
- Run tests if available (`npm test`)
- If any fail: stop and help the developer fix the issue before proceeding to the next version
- If all pass: commit the migration for this version step:
  ```bash
  git add -A
  git commit -m "chore: migrate essencium-frontend to v<version>"
  ```

**2e. Repeat** for the next version in the path

**3. COMPLETE**
- After all versions are migrated, present a summary of what was done
- Remind the developer to update `@frachtwerk/essencium-lib` and `@frachtwerk/essencium-types` in their package.json to the target version and run `npm install` / `pnpm install`

**Important skill instructions:**
- The skill must tell Claude to read `references/categories.md` during the APPLY phase (use a relative path reference)
- The skill must handle the edge case where a manifest references a PR link: use WebFetch to get the diff, or fall back to the manifest's `notes` field if WebFetch is unavailable
- The skill must not proceed to the next version step until VERIFY passes

- [ ] **Step 2: Review the skill against the spec**

Read the design spec at the essencium-frontend repo and verify:
- All 7 categories are handled
- The version-by-version workflow matches
- The auto/interactive split matches the spec's table
- Edge cases from the spec are addressed (deleted files, already-applied fixes, dependency + file tracking overlap)

- [ ] **Step 3: Commit**

```bash
git add skills/migrate-essencium/SKILL.md
git commit -m "feat: add /migrate-essencium skill"
```

### Task 9: Test the plugin end-to-end

- [ ] **Step 1: Test plugin loads correctly**

From a downstream project directory (or a test copy), run Claude Code with the plugin:

```bash
claude --plugin-dir /tmp/essencium-frontend-migration-plugin
```

Verify that `/migrate-essencium` appears in the available skills.

- [ ] **Step 2: Test a dry run**

Invoke `/migrate-essencium` in a project that uses essencium-lib. Verify:
- It correctly detects the current version from package.json
- It finds and loads the manifest files
- It presents a migration plan
- Stop before applying (verify the plan is sensible)

- [ ] **Step 3: Fix any issues found during testing**

Iterate on the skill files based on what worked and what didn't. Common issues to watch for:
- Incorrect relative paths to reference files or manifests
- Missing tool permissions in the skill
- Manifest parsing issues

- [ ] **Step 4: Commit fixes and push**

```bash
git add -A
git commit -m "fix: address issues found during end-to-end testing"
git push origin main
```

---

## Phase 5: Backfill Manifests (essencium-frontend repo)

### Task 10: Generate remaining manifests using the authoring skill

Once the `/author-migration` skill (Task 3) is working, use it to generate manifests for all documented versions. Prioritize in this order:

- [ ] **Step 1: Generate manifests for major migration versions**

These are the most impactful versions with significant breaking changes:

```bash
claude "/author-migration 9.4.0"   # Tailwind CSS adoption
claude "/author-migration 9.0.0"   # Mantine styling fixes, App Router
claude "/author-migration 7.0.0"   # TanStack Query v5, Next.js 14
claude "/author-migration 6.0.0"   # Mantine v7
```

Review each generated manifest against the MIGRATION.md entry for that version. Fix any issues.

- [ ] **Step 2: Generate manifests for remaining versions**

Work through the remaining versions documented in MIGRATION.md:

```
9.3.0, 9.2.0, 9.1.0, 9.0.1
8.1.1, 8.1.0
7.10.0, 7.9.1, 7.9.0, 7.8.0, 7.7.0, 7.5.0, 7.4.0, 7.3.0, 7.2.0, 7.1.1, 7.1.0, 7.0.1
6.1.1, 6.1.0
```

- [ ] **Step 3: Commit all manifests**

```bash
git add packages/app/manifests/
git commit -m "chore: backfill migration manifests for all documented versions"
```

- [ ] **Step 4: Copy all manifests to the plugin repo**

```bash
cp packages/app/manifests/*.yaml /tmp/essencium-frontend-migration-plugin/manifests/
cd /tmp/essencium-frontend-migration-plugin
git add manifests/
git commit -m "chore: add all migration manifests"
git push origin main
```
