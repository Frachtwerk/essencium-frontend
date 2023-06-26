import { i18n } from 'next-i18next'

export async function mergeTranslationSources(
  languages: Record<'de' | 'en', Record<string, string> | undefined>
): Promise<void> {
  Object.entries(languages).forEach(([language, serverTranslations]) => {
    i18n?.addResourceBundle(
      language,
      'common',
      {
        ...serverTranslations,
      },
      true,
      true
    )
  })
}
