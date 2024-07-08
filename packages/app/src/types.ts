export {}

declare global {
  interface Window {
    runtimeConfig: {
      required: {
        API_URL: string

        APP_ENV: string
      }
      optional: {
        OAUTH_REDIRECT_URI: string

        SHOW_APP_VERSION: string
      }
    }
  }
}
