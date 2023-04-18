import { Group, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import i18next from 'i18next'
import { Translations } from 'lib'

export function TranslationsView(): JSX.Element {
  function getTranslationsByLanguage(
    lang: string
  ): Record<string, string> | undefined {
    const data = i18next.getDataByLanguage(lang)
    return data?.translation
  }

  return (
    <>
      <Group>
        <IconLanguage size="32" />
        <Title order={2}> Translation</Title>
      </Group>

      <Translations getTranslations={getTranslationsByLanguage} />
    </>
  )
}
