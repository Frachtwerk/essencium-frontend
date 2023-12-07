<div align="center">

# Essencium

[![Licence: MIT](https://img.shields.io/badge/licence-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![Contributors](https://img.shields.io/github/contributors/Frachtwerk/essencium-frontend) ![npm](https://img.shields.io/npm/dt/%40frachtwerk/essencium-lib) ![Version](https://img.shields.io/github/package-json/v/Frachtwerk/essencium-frontend?filename=packages%2Flib%2Fpackage.json&label=Essencium&color=00b5d6CMYK) ![Build](https://github.com/Frachtwerk/essencium-frontend/actions/workflows/ci.yml/badge.svg)

## ![Essencium Logo](../app/public/img/web/logotype_400x100px.svg)

### [Check out the docs](https://docs.essencium.dev)

Essencium consists of a core library (called lib inside the monorepo and @frachtwerk/essencium-lib on npm).

[Report an issue](https://github.com/Frachtwerk/essencium-frontend/issues)
</div>

---

## Table of Contents

- [Project architecture](#project-architecture)

## [Project architecture](https://docs.essencium.dev/architecture)

All components are developed inside the lib and imported inside the app. That allows us to easily update our lib package.

```bash
src
├── components
│   ├── TestComponent
│   │   ├── index.ts
│   │   ├── TestComponent.tsx
├── index.ts
.commitlintrc.json
.eslintignore
.eslintrc.json
.gitignore
.prettierignore
.prettierrc.json
package.json
postcss.config.cjs
README.md
rollup.config.js
tailwind.config.cjs
tsconfig.json
```
