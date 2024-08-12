import { createInstance, i18n, Resource } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

const namespace = 'common'

export const i18nConfig = {
  locales: ['en', 'de'],
  defaultLocale: 'en',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function initTranslations(
  locale: string,
  i18nInstance?: i18n,
  resources?: Resource,
) {
  // eslint-disable-next-line no-param-reassign
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string) =>
          import(`../../public/locales/${language}/${namespace}.json`),
      ),
    )
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'common',
    fallbackNS: namespace,
    ns: namespace,
    preload: resources ? [] : i18nConfig.locales,
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  }
}
