import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...target }

  for (const key of Object.keys(source)) {
    if (
      typeof target[key] === 'object' &&
      target[key] !== null &&
      typeof source[key] === 'object' &&
      source[key] !== null
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>,
      )
    } else {
      result[key] = source[key]
    }
  }

  return result
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as 'en' | 'de')) {
    locale = routing.defaultLocale
  }

  // 1. Load static messages from JSON files
  const staticMessages = (
    await import(`../../public/locales/${locale}/common.json`)
  ).default

  // 2. Fetch backend translation overrides
  let backendMessages: Record<string, unknown> = {}
  try {
    const apiUrl =
      typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
        : undefined

    if (apiUrl) {
      const res = await fetch(`${apiUrl}/v1/translations/${locale}`, {
        next: { revalidate: 0 },
      })

      if (res.ok) {
        backendMessages = await res.json()
      }
    }
  } catch {
    // Fallback to static messages if backend is unavailable
  }

  // 3. Deep merge static + backend (backend overrides static)
  const messages = deepMerge(staticMessages, backendMessages)

  return {
    locale,
    messages,
  }
})
