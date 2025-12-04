import { i18n } from 'i18next'

import { useGetTranslations } from '@/api'
import { namespace } from '@/config'

export function useAddTranslations(i18nInstance: i18n): () => void {
  const locale = i18nInstance.language

  const { data: serverTranslations } = useGetTranslations(locale)()

  function addTranslations(): void {
    if (serverTranslations) {
      i18nInstance.addResourceBundle(
        locale,
        namespace,
        serverTranslations,
        true,
        true,
      )
    }
  }

  return addTranslations
}
