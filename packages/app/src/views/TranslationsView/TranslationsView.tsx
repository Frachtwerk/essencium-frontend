import { Group, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import i18next, { t } from 'i18next'
import { Translations } from 'lib'

function getTranslationsByLanguage(
  lang: string
): Record<string, string> | undefined {
  const data = i18next.getDataByLanguage(lang)

  return data?.translation
}

export function TranslationsView(): JSX.Element {
  return (
    <>
      <Group>
        <IconLanguage size="32" />
        <Title order={2}>{t('translationsView.title')}</Title>
      </Group>

      <Translations getTranslations={getTranslationsByLanguage} />
    </>
  )
}
