export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
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

        APP_ENV: `${process.env.APP_ENV}`,
      },
      optional: {
        OAUTH_REDIRECT_URI: `${process.env.OAUTH_REDIRECT_URI}`,

        SHOW_APP_VERSION: `${process.env.SHOW_APP_VERSION}`,
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
