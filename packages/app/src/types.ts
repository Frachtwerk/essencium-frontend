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
        DEFAULT_USER_EMAIL: string
        APP_ENV: string
      }
    }
  }
}
