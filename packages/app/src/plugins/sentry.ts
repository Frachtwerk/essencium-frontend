import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import 'virtual:vite-plugin-sentry/sentry-config'

const { dist, release } = import.meta.env.VITE_PLUGIN_SENTRY_CONFIG

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.5,
    dist,
    release,
  })
}
