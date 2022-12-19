# Essencium Application

## Table of Contents

- [Project architecture](#project-architecture)
  - [Files and folder structure](#files-and-folder-structure)
- [Development guide](#development-guide)
  - [Starting the development server](#starting-the-development-server)

## Project architecture

### Files and folder structure

```bash
src
├── components
│   ├── index.ts
│   ├── AdminUserList.tsx
├── plugins
│   ├── sentry.ts
├── store
│   ├── index.ts
│   ├── slices
│   │   ├── index.ts
│   │   ├── dinoSlice.ts
│   │   ├── userSlice.ts
├── App.tsx
├── env.d.ts
├── index.css
├── main.tsx
.commitlintrc.json
.dockerignore
.eslintignore
.eslintrc.json
.gitignore
.prettierignore
.prettierrc.json
Dockerfile
index.html
package.json
postcss.config.cjs
README.md
tailwind.config.cjs
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Development guide

### Starting the development server

This repository uses [Vite](https://vitejs.dev/) as build tool. It lets us spin up a dev server extremely fast because it uses native ES modules.
