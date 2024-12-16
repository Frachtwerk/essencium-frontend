export {}

declare global {
  interface Window {
    runtimeConfig: {
      required: {
        API_URL: string
        APP_URL: string
      }
      optional: {
        OAUTH_REDIRECT_URI: string
        APP_ENV: string
      }
    }
  }
}
