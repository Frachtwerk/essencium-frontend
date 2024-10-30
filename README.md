<div align="center">

# Essencium

[![Licence: MIT](https://img.shields.io/badge/licence-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![Contributors](https://img.shields.io/github/contributors/Frachtwerk/essencium-frontend) ![npm](https://img.shields.io/npm/dt/%40frachtwerk/essencium-lib) ![Version](https://img.shields.io/github/package-json/v/Frachtwerk/essencium-frontend?filename=packages%2Flib%2Fpackage.json&label=Essencium&color=00b5d6CMYK) ![Build](https://github.com/Frachtwerk/essencium-frontend/actions/workflows/ci.yml/badge.svg)

## ![Essencium Logo](./packages/app/public/img/web/logotype_400x100px.svg)

React based starter monorepo consisting of a component library, docs and a boilerplate application.

### [Preview](https://staging.essencium.dev)

|

### [Docs](https://docs.essencium.dev)

[Report an issue](https://github.com/Frachtwerk/essencium-frontend/issues)

</div>

---

## [Setup](https://docs.essencium.dev/devguide/setup)

### `setup-env`

This command is supposed to be executed only once when setting up the project. It installs all dependencies and sets up Husky for commit linting.

### `clean`

If you need to clean up the project, that's your command. It deletes all `dist` folders as well as `node_modules` folders.

### `clean:install`

Does the same as `clean`, but afterwards all dependencies will be installed again.

### `lint`

Performs ESLint linting throughout the whole codebase.

### `format`

Performs Prettier formatting throughout the whole codebase.

### `test`

Runs all existing tests with Vitest.

### `dev`

Behind this command, the command `pnpm --filter @frachtwerk/essencium-app dev` is executed. The Next.js development server will start and the library **and** the application are ready for development. Both packages support HMR.

### `build`

Behind this command, the command `pnpm --stream -r build` is executed. Due to the fact, that the Essencium library is a direct dependency of the application, it gets built firstly to make sure the application has the latest version. As a result, a `dist` folder gets created for production inside the `app` package.

## [Project Architecture](https://docs.essencium-frontend.vercel.app/architecture)

## [Development Guide](https://docs.essencium-frontend.vercel.app/devguide)

## [Styleguide](https://docs.essencium-frontend.vercel.app/styleguide)
