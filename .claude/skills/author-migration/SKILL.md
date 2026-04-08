---
name: author-migration
description: "Generate a migration manifest (YAML) for a new essencium-frontend release. Use when preparing a release to document app-level changes for downstream projects."
argument-hint: "[version]"
---

# Author Migration Manifest

Generate a migration manifest that documents all app-level changes between two releases of essencium-frontend. The manifest helps downstream projects understand what changed and how to migrate.

## Workflow

### Step 1: Determine versions

1. If a version argument was provided, use it as the **target version**. Otherwise, read the `version` field from `packages/app/package.json`.
2. Find the **previous release tag** by running:
   ```bash
   git tag --list 'essencium-app-v*' --sort=-v:refname
   ```
   - If the target version already has a tag, pick it as current and the next entry as previous.
   - If the target version does not have a tag yet, use `HEAD` as the current ref and the first entry in the tag list as the previous tag.
3. Confirm both versions with the user before proceeding. Display:
   - Previous version / tag
   - Target version / ref (tag or HEAD)

### Step 2: Diff the app package

Run these commands to collect the raw change data:

```bash
# Full diff of the app package between the two refs
git diff <previous-tag>..<current-ref> -- packages/app/

# Commit log with PR references
git log --oneline --grep='#' <previous-tag>..<current-ref> -- packages/app/

# Also get the full log for context
git log --oneline <previous-tag>..<current-ref> -- packages/app/

# List newly added files
git diff --diff-filter=A --name-only <previous-tag>..<current-ref> -- packages/app/

# List deleted files
git diff --diff-filter=D --name-only <previous-tag>..<current-ref> -- packages/app/

# List modified files
git diff --diff-filter=M --name-only <previous-tag>..<current-ref> -- packages/app/
```

Extract PR numbers from commit messages (look for patterns like `#123`, `pull/123`, or full GitHub URLs) and construct links in the format:
`https://github.com/Frachtwerk/essencium-frontend/pull/NNN`

### Step 3: Classify changes

Categorize every change into one of 7 types. Process them in this order:

#### 3a. `dependency_migration` — Dependency version changes

Compare `packages/app/package.json` between the two refs to find dependency changes:

```bash
git diff <previous-tag>..<current-ref> -- packages/app/package.json
```

For each changed dependency:
- Determine old and new version numbers
- **Major version bumps** (e.g., 2.x -> 3.x): set `scope: project_wide` — downstream code using that library may need changes
- **Minor/patch bumps** (e.g., 2.1 -> 2.3): set `scope: package` — just bumping the version is sufficient
- Exception: if a minor bump introduces known breaking behavior, use `scope: project_wide` and explain in `notes`
- Set `reference` to the library's changelog or releases page
- Write a concise `notes` describing the impact

#### 3b. `infrastructure` — Config/build tool changes

Check for modifications to these config files:
- `next.config.js` / `next.config.mjs`
- `postcss.config.cjs` / `postcss.config.mjs`
- `tsconfig.json` / `tsconfig.base.json`
- `eslint.config.mjs` / `.eslintrc.json`
- `tailwind.config.*`
- `vitest.config.*`
- `playwright.config.*`
- `Dockerfile`, `docker-compose.*`

Each infrastructure entry should describe what changed and why, list affected files with their action (modified/added), and include a PR link if available.

#### 3c. `translation` — Locale key changes

Check `packages/app/public/locales/` for changes:

```bash
git diff <previous-tag>..<current-ref> -- packages/app/public/locales/
```

For each locale file changed:
- Diff the JSON keys to identify `keys_added`, `keys_removed`, and `keys_changed`
- A key is "changed" if its value was modified but the key still exists
- Group all locale changes into a single entry per logical change (e.g., if `de` and `en` both got the same new key, that is one entry)
- List affected locales in the `locales` array

#### 3d. `env_variable` — Environment variable changes

Check `.env*` files for changes:

```bash
git diff <previous-tag>..<current-ref> -- packages/app/.env*
```

Document each added, removed, or changed variable with its name and whether it is required.

#### 3e. `new_file` — Newly added files

From the `--diff-filter=A` output, create an entry for each new file. Describe the file's purpose by reading its content. Include PR links where possible.

#### 3f. `file_removal` — Deleted files

From the `--diff-filter=D` output, create an entry for each deleted file. Explain why it was removed and what replaces it (check the commit message and surrounding changes for context).

#### 3g. `file_tracking` — All other modified files

All remaining modified files that were not already classified above go here. Group related files into a single entry when they are part of the same PR or feature. Describe what changed and why.

### Step 4: Generate the manifest YAML

Save the manifest to `packages/app/manifests/<version>.yaml`.

Before writing, review existing manifests in `packages/app/manifests/` as format examples (especially `9.4.5.yaml` for a small release and `9.5.0.yaml` for a large release).

The manifest must follow this exact schema:

```yaml
# Top-level fields (all required)
version: "X.Y.Z"        # The version being released
from: "X.Y.Z"           # The previous version
date: "YYYY-MM-DD"      # Today's date

changes:                 # Array of change entries

# ── 1. dependency_migration — library version bumps ──────────────────
- type: dependency_migration
  package: "package-name"
  from: "old-version"
  to: "new-version"
  scope: project_wide | package  # project_wide if API changes, package if just bump
  reference: "url-to-changelog"
  notes: "description of impact"

# ── 2. infrastructure — config/build tool changes ────────────────────
- type: infrastructure
  description: "what changed"
  files:
    - path: "relative/to/app/root"
      action: modified | added
  pr: "https://github.com/Frachtwerk/essencium-frontend/pull/NNN"  # optional
  notes: "additional context"  # optional

# ── 3. file_tracking — modified existing files ───────────────────────
- type: file_tracking
  description: "what changed and why"
  files:
    - path: "relative/to/app/root"
      action: modified
  pr: "https://github.com/Frachtwerk/essencium-frontend/pull/NNN"  # optional

# ── 4. new_file — newly added files ─────────────────────────────────
- type: new_file
  path: "relative/to/app/root"
  description: "purpose of the file"
  pr: "https://github.com/Frachtwerk/essencium-frontend/pull/NNN"  # optional

# ── 5. file_removal — deleted files ──────────────────────────────────
- type: file_removal
  path: "relative/to/app/root"
  description: "why it was removed and what replaces it"
  pr: "https://github.com/Frachtwerk/essencium-frontend/pull/NNN"  # optional

# ── 6. translation — locale key changes ──────────────────────────────
- type: translation
  description: "what translations changed"
  locales: ["de", "en"]
  keys_added: ["dotted.key.path"]
  keys_removed: ["dotted.key.path"]
  keys_changed: ["dotted.key.path"]

# ── 7. env_variable — new/changed environment variables ──────────────
- type: env_variable
  description: "what variables changed"
  variables:
    - name: "VARIABLE_NAME"
      required: true | false
```

#### Key rules for the manifest

- **File paths are ALWAYS relative to the app package root** — use `src/...` not `packages/app/src/...`. Strip the `packages/app/` prefix from all paths.
- **PR links** should be extracted from commit messages where possible.
- **`scope: project_wide`** on dependency_migration means downstream code using that library may need changes. **`scope: package`** means just bumping the version is sufficient.
- **Group related changes** — if multiple files were changed in the same PR/feature, put them in a single `file_tracking` entry with multiple files.
- **Order changes** by type: infrastructure first, then dependency_migration (major/project_wide before minor/package), then new_file, file_removal, file_tracking, translation, env_variable.
- **Use comments** as section separators in the YAML (see existing manifests for style).

### Step 5: Validate the YAML

After writing the file, verify it is valid YAML:

```bash
python3 -c "import yaml; yaml.safe_load(open('packages/app/manifests/<version>.yaml')); print('YAML is valid')"
```

If validation fails, fix the syntax errors and re-validate.

### Step 6: Present for review

Display the complete manifest to the user. Ask them to:
1. Review each entry for accuracy
2. Confirm dependency scopes are correct
3. Check that no changes were missed
4. Verify PR links are correct

Only commit the manifest after the user confirms it is ready.
