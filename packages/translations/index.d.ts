import { ThirdPartyModule } from 'i18next'

declare module 'translations' {
  type En = JSON
  type De = JSON

  const en: En
  const de: De
  const initI18n: (reacti18n: ThirdPartyModule) => void
}
