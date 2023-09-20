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
  AuthLayout,
  getTranslation,
  Translations,
  useDeleteTranslation,
  useGetTranslations,
  userRightsAtom,
  useUpdateTranslation,
} from '@frachtwerk/essencium-lib'
import { TranslationInput } from '@frachtwerk/essencium-types'
import { Flex, Text, Title } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import { i18n, useTranslation } from 'next-i18next'

import De from '@/../public/locales/de/common.json'
import En from '@/../public/locales/en/common.json'
import { baseGetStaticProps } from '@/utils/next'

interface TTranslations {
  [key: string]: string | TTranslations
}

function getTranslationsByLanguage(
  lang: string,
): Record<string, string> | undefined {
  const translations = i18n?.getResourceBundle(lang, 'common')

  return translations
}

function TranslationsView(): JSX.Element {
  const { t } = useTranslation()

  const userRights = useAtomValue(userRightsAtom)

  const { mutate: updateTranslation } = useUpdateTranslation()
  const { mutate: deleteTranslation } = useDeleteTranslation()

  const { refetch: refetchServerTranslationsDe, data: backendTranslationsDe } =
    useGetTranslations('de')
  const { refetch: refetchServerTranslationsEn, data: backendTranslationsEn } =
    useGetTranslations('en')

  function onUpdateTranslation(translationInput: TranslationInput): void {
    updateTranslation(translationInput, {
      onSuccess: async () => {
        await refetchServerTranslationsDe()
        await refetchServerTranslationsEn()

        i18n?.addResourceBundle(
          i18n.language,
          'common',
          i18n.language === 'de'
            ? backendTranslationsDe
            : backendTranslationsEn,
          true,
          true,
        )
      },
    })
  }

  function onDeleteTranslation(translationKey: TranslationInput['key']): void {
    deleteTranslation(translationKey, {
      onSuccess: async () => {
        await refetchServerTranslationsDe()
        await refetchServerTranslationsEn()

        const keyPath = translationKey.split('.')

        const valueByKeyPath: string = keyPath.reduce(
          (obj: TTranslations | string, key: string) => {
            if (typeof obj === 'string') {
              return obj
            }

            return obj[key]
          },
          i18n?.language === 'de'
            ? (De as TTranslations)
            : (En as TTranslations),
        ) as string

        i18n?.addResource(
          i18n.language,
          'common',
          translationKey,
          valueByKeyPath,
        )

        i18n?.init()
      },
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
        userRights={userRights}
        getTranslations={getTranslationsByLanguage}
        updateTranslation={onUpdateTranslation}
        deleteTranslation={onDeleteTranslation}
      />
    </>
  )
}

TranslationsView.getLayout = function getLayout(
  page: React.ReactNode,
  version?: string,
): JSX.Element {
  return (
    <AuthLayout
      routeName={getTranslation('translationsView.title')}
      version={version}
    >
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default TranslationsView
