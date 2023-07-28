/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  getTranslation,
  mergeTranslationSources,
  Translations,
} from '@frachtwerk/essencium-lib'
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
import { baseGetStaticProps } from '@/utils/next'

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
