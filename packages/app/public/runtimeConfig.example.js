// This file will not be tracked by git and should only be adjusted for new environment variables

window['runtimeConfig'] = {
  required: {
    API_URL: 'https://backend.staging.essencium.dev',
    APP_URL: 'http://localhost:3000',
  },
  optional: {
    OAUTH_REDIRECT_URI: 'http://localhost:3000',
    DEFAULT_USER_EMAIL: '<DEFAULT_USER_EMAIL>',
    APP_ENV: 'development',
  },
}
