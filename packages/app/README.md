<div align="center">

# Essencium

[![Licence: MIT](https://img.shields.io/badge/licence-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![Contributors](https://img.shields.io/github/contributors/Frachtwerk/essencium-frontend) ![Version](https://img.shields.io/github/package-json/v/Frachtwerk/essencium-frontend?filename=packages%2Fapp%2Fpackage.json&label=Essencium-app&color=00b5d6CMYK) ![Build](https://github.com/Frachtwerk/essencium-frontend/actions/workflows/ci.yml/badge.svg)

## ![Essencium Logo](../app/public/img/web/logotype_400x100px.svg)

### [Check out the docs](https://docs.essencium.dev)

The package called app is acting as boilerplate and consumes all the other packages

[Report an issue](https://github.com/Frachtwerk/essencium-frontend/issues)

</div>

---

## [App documentation](https://docs.essencium.dev/devguide/packageResponsibilities)

- the main application that consumes the lib, types, eslint-config and prettier-config packages
- Next.js pages that import components from lib
- API implementation
- application state
- routing (via Next.js App Router)
- error logging (via Sentry)
- E2E tests (via Playwright)

## Starting the application locally

### Prerequisites

Before starting the application, make sure to complete the setup steps outlined below:

### Docker

To start the application locally, a full Docker environment is available.

#### Authentication

The images are based on [Docker hardened images](https://github.com/docker-hardened-images) that require authentication to pull.  
Login with the following command using your Docker Hub credentials (username and [PAT](https://docs.docker.com/security/access-tokens/#create-a-personal-access-token)):

```bash
docker login dhi.io
```

#### Docker BuildX

To build the images, Docker Buildx is required. You can check if it is available with the following command:

```bash
docker buildx version
```

If it is not available, you can install it by following the instructions in the [Docker Buildx documentation](https://github.com/docker/buildx?tab=readme-ov-file#installing).

#### Starting the application

To start the full application, run the following command in the root directory of the repository:

```bash
docker compose up --build
```

This will build the images based on the current code and start the application.  
The following services will be started:

- `backend`: The API service that handles the business logic and communication with the database. Available at http://localhost:8098.
- `db`: The PostgreSQL database that stores the application data. Available at localhost:5432.
- `essencium-frontend`: The Next.js frontend that provides the user interface. Available at localhost:3000.