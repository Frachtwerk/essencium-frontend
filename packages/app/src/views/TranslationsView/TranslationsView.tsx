import { Translations } from '@frachtwerk/essencium-lib'
import { TranslationInput } from '@frachtwerk/essencium-types'
import { Group, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import i18next, { t } from 'i18next'

import {
  useDeleteTranslation,
  useGetTranslations,
  useUpdateTranslation,
} from '@/api/translations'
import { mergeTranslationSources } from '@/utils/translation'

function getTranslationsByLanguage(
  lang: string
): Record<string, string> | undefined {
  const data = i18next.getDataByLanguage(lang)

  return data?.translation
}

export function TranslationsView(): JSX.Element {
  const { mutate: updateTranslation } = useUpdateTranslation()
  const { mutate: deleteTranslation } = useDeleteTranslation()

  const { data: deServerTranslations, refetch: refetchServerTranslationsDe } =
    useGetTranslations('de')
  const { data: enServerTranslations, refetch: refetchServerTranslationsEn } =
    useGetTranslations('en')

  async function onUpdateTranslation(
    translationInput: TranslationInput
  ): Promise<void> {
    updateTranslation(translationInput)

    await refetchServerTranslationsDe()
    await refetchServerTranslationsEn()

    mergeTranslationSources({
      de: deServerTranslations,
      en: enServerTranslations,
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
      />
    </>
  )
}
