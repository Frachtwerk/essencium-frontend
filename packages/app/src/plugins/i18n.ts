import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { de, en } from 'translations'

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

    lng: 'en',

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
