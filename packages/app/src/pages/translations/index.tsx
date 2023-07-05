import { Translations } from '@frachtwerk/essencium-lib'
import { TranslationInput } from '@frachtwerk/essencium-types'
import { Flex, Text, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { i18n, useTranslation } from 'next-i18next'

import {
  useDeleteTranslation,
  useGetTranslations,
  useUpdateTranslation,
} from '@/api/translations'
import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'
import { getTranslation } from '@/utils/getTranslation'
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
      <Title py="md" size="h2">
        <Flex align="center" gap={10}>
          <IconLanguage size="32" />
          <Text>{t('translationsView.title')}</Text>
        </Flex>
      </Title>

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
  return (
    <AuthLayout routeName={getTranslation('translationsView.title')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default TranslationsView
