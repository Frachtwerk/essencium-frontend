import { Translations } from '@frachtwerk/essencium-lib'
import { TranslationInput } from '@frachtwerk/essencium-types'
import { Group, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { i18n, useTranslation } from 'next-i18next'

import {
  useDeleteTranslation,
  useGetTranslations,
  useUpdateTranslation,
} from '@/api/translations'
import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'
import { mergeTranslationSources } from '@/utils/mergeTranslationSources'

function getTranslationsByLanguage(
  lang: string
): Record<string, string> | undefined {
  const translations = i18n?.getResourceBundle(lang, 'common')

  return translations
}

function TranslationsView(): JSX.Element {
  const { t } = useTranslation()

  const { mutate: updateTranslation } = useUpdateTranslation()
  const { mutate: deleteTranslation } = useDeleteTranslation()

  const { data: deServerTranslations, refetch: refetchServerTranslationsDe } =
    useGetTranslations('de')
  const { data: enServerTranslations, refetch: refetchServerTranslationsEn } =
    useGetTranslations('en')

  async function onUpdateTranslation(
    translationInput: TranslationInput
  ): Promise<void> {
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

TranslationsView.getLayout = function getLayout(
  page: React.ReactNode
): JSX.Element {
  return <AuthLayout>{page}</AuthLayout>
}

export const getStaticProps = baseGetStaticProps()

export default TranslationsView
