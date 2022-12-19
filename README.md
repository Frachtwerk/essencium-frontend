# Essencium

## Table of Contents

- [Project architecture](#project-architecture)
  - [Background](#background)
  - [Dependency approach](#dependency-approach)
- [Development guide](#development-guide)
  - [Environment preparations](#environment-preparations)
  - [Environment setup](#environment-setup)
  - [Code style and linting](#code-style-and-linting)
  - [Commits](#commits)
  - [Build a new release](#build-a-new-release)
  - [Releasing a new version](#releasing-a-new-version)
- [Misc](#misc)
  - [`nx` cheat sheet](#nx-cheat-sheet)

## Project architecture

### Background

The goal of Essencium is effortlessly build a scalable, easy-to-maintain and adaptable frontend. Projects based on Essencium should receive updates in the simplest way. Therefore, the Essencium library is built as an `npm`-package that can be installed via a package manager like `npm`, `yarn` or `pnpm`. As a consequence, new changes made on the Essencium library can be rolled-out as a new minor or patch version and Essencium-based projects can easily update the dependency without copy and pasting the code manually.

### Monorepo architecture

We chose to use a monorepo architecture with the library, docs and the application as packages. That allows to easily develop the library, utilizing Vite and inspect the source code changes of the library via HMR inside the browser. As a build tool we use [`nx`](https://nx.dev/). That allows us to run certain commands (like `build`) for all packages, with keeping the correct dependency order in mind. Additionally, `nx` caches jobs, that means if source files of a dependency have not been changed, the needed files get fetched from the cache.

The following commands are available:

#### `setup-env`

This command is supposed to be executed only once when setting up the project. It installs all dependencies and sets up Husky for commit linting.

#### `clean`

If you need to clean up the project, that's your command. It deletes all `dist` folders as well as `node_modules` folders. Afterwards, all dependencies will be installed again.

#### `dev`

Behind this command, the command `nx dev app` is executed. The Vite development server will start and the library **and** the application are ready for development. Both packages support HMR.

#### `build`

Behind this command, the command `nx build app` is executed. Due to the fact, that the Essencium library is a direct dependency of the application, it gets built firstly to make sure the application has the latest version. As a result, a `dist` folder gets created for production inside the `app` package.

### Dependency approach

The idea is to provide the ability to import each view/page/component from the Essencium library and be able to customize the imported pages/components per project as needed to provide a maximum of flexibility.

#### Example

```typescript
import { UsersList } from '@frachtwerk/essencium-frontend'

...
return <UsersList /> // without customizations, or:
// return <UsersList> ... </ UsersList> // with customizations
...
```

If the page/view/component needs heavy adjustments, the recommendation is to **not** use the import-approach but to fallback to a "disconnected" page/view/component from the Essencium library due to the fact that it would generate unnecessarily much complexity.

## Development guide

### Environment preparations

The repository requires Node version 16 or later, which is in [LTS](https://github.com/nodejs/release#release-schedule) until **11.09.2023**. It can be easily installed via the [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) following the setup in the `README.md`. Alternatively, you can install [Volta](https://volta.sh/), a JavaScript tool manager that automatically switches to the supported Node version when you navigate into the projeckt folder. Besides, you need the package manager `pnpm`, which can be installed with `npm install --global pnpm`.

### Environment setup

Before the environment setup is complete, you need to run `pnpm setup-env`. The script will automatically install all package dependencies and enable husky for pre-commit linting.

### Code style and linting

For enforcing code style and utilizing static code analyzing we use ESLint along with a bunch of rulesets. The most noteworthy ruleset is the [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/react/). We chose this approach because it provides strict but conventional rules. You can always execute the commands `pnpm format` to apply the Prettier formatting settings for all project files inside the `src`-directory, or `pnpm lint` to lint all projects files inside the `src`-directory based on the ESLint configuration.

### Commits

[`Commitlint`](https://commitlint.js.org/#/) makes sure you are following the rules of [`conventional-commits`](https://www.conventionalcommits.org/) (`type(scope?): message`). In combination with [`husky`](https://typicode.github.io/husky/#/) we can use the the Git `commit-msg` hook to lint the commit message. If the commit message doesn’t follow the convention of conventional-commits, commitlint will error out and husky gives you an idea of what is wrong.

### Build a new release

Usually, a build is created inside the CI/CD pipeline which executes the command `pnpm build` but it can be executed locally either. Behind this command, the TypeScript files get transpiled to JavaScript files, and afterwards, these files get bundled with [Rollup](https://rollupjs.org/guide/en/) for production. A new folder `dist` is created holding the build that can be distributed. For previewing the build just execute `pnpm preview` and open the localhost on the displayed port in the terminal.

### Releasing a new version

This repository follows the [semantic versioning](https://semver.org/) approach using the npm package [`standard-version`](https://github.com/conventional-changelog/standard-version) following the [`conventional-commits`](https://www.conventionalcommits.org/) specification. A new release can be created by running the script `pnpm release` with optional flags `standard-version` provides, see [`standard-version README`](https://github.com/conventional-changelog/standard-version/blob/master/README.md). After running the command, the `version` inside `package.json` gets bumped and a new changelog paragraph for the version gets added to the `CHANGELOG.md` file.

## Misc

### `nx` cheat sheet

- `targetDefaults`: run corresponding command at all depenend packages beforehand
- `npx nx run-many --target=<cmd>`: run a command on all packages in monorepo
- `npx nx affected --target=<cmd>`: run a command only on packages that got changed
- `npx nx <cmd> <package>`: run a nx command
- `--skip-nx-cache`: skip cache flag
