import i18next from 'i18next'

export function mergeTranslationSources(
  languages: Record<'de' | 'en', Record<string, string> | undefined>
): void {
  Object.entries(languages).forEach(([language, serverTranslations]) => {
    i18next.addResourceBundle(
      language,
      'translation',
      {
        ...serverTranslations,
      },
      true,
      true
    )
  })
}
