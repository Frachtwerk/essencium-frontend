export async function register(): Promise<void> {
  if (process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION) return

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // eslint-disable-next-line no-console
    console.log('Registering instrumentation...')

    const fs = await import('fs')
    const path = await import('path')

    const filePath = path.join(process.cwd(), 'public', 'runtimeConfig.js')

    const runtimeConfig = fs.readFileSync(filePath, 'utf8')

    const REPLACEMENTS: {
      required: Record<string, string>
      optional: Record<string, string>
    } = {
      required: {
        API_URL: `${process.env.API_URL}`,
        APP_URL: `${process.env.APP_URL}`,
      },
      optional: {
        OAUTH_REDIRECT_URI: `${process.env.OAUTH_REDIRECT_URI}`,
        DEFAULT_USER_EMAIL: `${process.env.DEFAULT_USER_EMAIL}`,
        APP_ENV: `${process.env.APP_ENV}`,
      },
    } as const

    // Check if all required env variables are provided
    Object.keys(REPLACEMENTS.required).forEach(key => {
      if (REPLACEMENTS.required[key] === 'undefined') {
        throw new Error(
          `Please provide required runtime env variables: ${Object.keys(
            REPLACEMENTS.required,
          )
            .filter(k => REPLACEMENTS.required[k] === 'undefined')
            .join(', ')}`,
        )
      }
    })

    let runtimeConfigModified = runtimeConfig

    // Replace all required env variables
    Object.keys(REPLACEMENTS.required).forEach(key => {
      const regex = new RegExp(`${key}:\\s*'.*?'`, 'g')
      const replacement = `${key}: '${REPLACEMENTS.required[key]}'`

      runtimeConfigModified = runtimeConfigModified.replace(regex, replacement)
    })

    // Replace all optional env variables
    Object.keys(REPLACEMENTS.optional).forEach(key => {
      const regex = new RegExp(`${key}:\\s*'.*?'`, 'g')
      const replacement = `${key}: '${REPLACEMENTS.optional[key]}'`

      runtimeConfigModified = runtimeConfigModified.replace(regex, replacement)
    })

    if (runtimeConfigModified !== runtimeConfig) {
      fs.writeFileSync(filePath, runtimeConfigModified, 'utf8')
    }
  }
}
