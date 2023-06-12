import { Translations } from '@frachtwerk/essencium-lib'
import { TranslationInput, UserOutput } from '@frachtwerk/essencium-types'
import { Group, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import i18next, { t } from 'i18next'
import { useAtom } from 'jotai'

import { userAtom } from '@/api/me'
import {
  useDeleteTranslation,
  useGetTranslations,
  useUpdateTranslation,
} from '@/api/translations'
import { mergeTranslationSources } from '@/utils/mergeTranslationSources'

function getTranslationsByLanguage(
  lang: string
): Record<string, string> | undefined {
  const data = i18next.getDataByLanguage(lang)

  return data?.translation
}

export function TranslationsView(): JSX.Element {
  const [user] = useAtom(userAtom)

  const userLanguage: UserOutput['locale'] = user?.locale || 'en'

  const { data: deServerTranslations, refetch: refetchServerTranslationsDe } =
    useGetTranslations('de')
  const { data: enServerTranslations, refetch: refetchServerTranslationsEn } =
    useGetTranslations('en')

  const { mutate: updateTranslation } = useUpdateTranslation()
  const { mutate: deleteTranslation } = useDeleteTranslation()

  function onUpdateTranslation(translationInput: TranslationInput): void {
    updateTranslation(translationInput, {
      onSuccess: async () => {
        const promises = Promise.all([
          refetchServerTranslationsDe(),
          refetchServerTranslationsEn(),
        ])

        await promises

        mergeTranslationSources({
          de: deServerTranslations,
          en: enServerTranslations,
        })
      },
    })
  }

  return (
    <>
      <Group>
        <IconLanguage size="32" />
        <Title order={2}>{t('translationsView.title')}</Title>
      </Group>

      <Translations
        getTranslations={getTranslationsByLanguage}
        updateTranslation={onUpdateTranslation}
        deleteTranslation={deleteTranslation}
        userLanguage={userLanguage}
      />
    </>
  )
}
