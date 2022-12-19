import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ChainedBackend from 'i18next-chained-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

// change path from backendTranslations to Starter API
const backendTranslations = '/backendLocales/{{lng}}/{{ns}}.json'

const localTranslations = '/locales/{{lng}}/{{ns}}.json'

i18n
  // detect user language
  .use(LanguageDetector)

  // chain multiple resources
  .use(ChainedBackend)

  // connect with React
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // different namespaces to seperate backend and local translations
    ns: ['backendTranslation', 'localTranslation'],
    defaultNS: 'backendTranslation',
    fallbackNS: 'localTranslation',

    lng: 'de',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      backends: [HttpBackend, HttpBackend],
      backendOptions: [
        {
          loadPath: backendTranslations,
        },
        {
          loadPath: localTranslations,
        },
      ],
    },
  })

export default i18n
