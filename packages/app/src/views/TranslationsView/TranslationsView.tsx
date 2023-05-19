import { Translations } from '@frachtwerk/essencium-lib'
import { Group, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import i18next, { t } from 'i18next'

import { useDeleteTranslation, useUpdateTranslation } from '@/api/translations'

function getTranslationsByLanguage(
  lang: string
): Record<string, string> | undefined {
  const data = i18next.getDataByLanguage(lang)

  return data?.translation
}

export function TranslationsView(): JSX.Element {
  const { mutate: updateTranslation } = useUpdateTranslation()
  const { mutate: deleteTranslation } = useDeleteTranslation()

  return (
    <>
      <Group>
        <IconLanguage size="32" />
        <Title order={2}>{t('translationsView.title')}</Title>
      </Group>

      <Translations
        getTranslations={getTranslationsByLanguage}
        updateTranslation={updateTranslation}
        deleteTranslation={deleteTranslation}
      />
    </>
  )
}
