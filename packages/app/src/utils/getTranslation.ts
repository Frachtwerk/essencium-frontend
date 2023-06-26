import { i18n } from 'next-i18next'

export function getTranslation(translationKey: string): string {
  return i18n?.t(translationKey) ?? translationKey
}
