import { i18n as i18next, ThirdPartyModule } from 'i18next'

declare module '@frachtwerk/translations' {
  type En = JSON
  type De = JSON

  const en: En
  const de: De
  const initI18n: (reacti18n: ThirdPartyModule) => void
  const i18n: typeof i18next
}
