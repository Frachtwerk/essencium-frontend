/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string
  readonly SENTRY_URL: string
  readonly SENTRY_AUTH_TOKEN: string
  readonly SENTRY_ORG: string
  readonly SENTRY_PROJECT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
