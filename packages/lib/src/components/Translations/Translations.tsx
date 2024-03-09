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

/* eslint-disable react/no-unstable-nested-components */
import { RIGHTS, TranslationInput } from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Input,
  Select,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import {
  IconArrowBackUp,
  IconCheck,
  IconSearch,
  IconX,
} from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FormEvent, useState } from 'react'
import { KeyPath } from 'react-json-tree'

import { hasRequiredRights } from '../../utils/hasRequiredRights'
import classes from './Translations.module.css'

// dynamically load the JSONTree component to avoid SSR errors
const JSONTree = dynamic(
  () => import('react-json-tree').then(response => response.JSONTree),
  {
    ssr: false,
  },
)

type FormEventWithTranslation = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>['target'] & {
    translation: {
      value: string
    }
  }
  nativeEvent: { submitter: { name: string } }
}

type Props = {
  getTranslations: (lang: string) => Record<string, string> | undefined
  updateTranslation: ({ locale, key, translation }: TranslationInput) => void
  deleteTranslation: (key: TranslationInput['key']) => void
  userRights: string[] | null
}

export function searchTranslationsObject(
  object: Record<string, string> | undefined,
  searchQuery: string,
): Record<string, string> {
  const searchResult: Record<string, string> = {}

  const regexSearchTerm = new RegExp(searchQuery, 'gi')

  if (object !== undefined) {
    Object.keys(object).forEach(key => {
      if (
        typeof object[key] === 'string' &&
        object[key].match(regexSearchTerm)
      ) {
        searchResult[key] = object[key]
      } else if (typeof object[key] === 'object' && object[key] !== null) {
        const nestedResult = searchTranslationsObject(
          object[key] as unknown as Record<string, string>,
          searchQuery,
        )

        if (Object.keys(nestedResult).length > 0) {
          ;(searchResult[key] as unknown as Record<string, string>) =
            nestedResult
        }
      }
    })

    return searchResult
  }

  return {}
}

export function Translations({
  getTranslations,
  updateTranslation,
  deleteTranslation,
  userRights,
}: Props): JSX.Element {
  const router = useRouter()

  const { t } = useTranslation()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()

  const TREE_THEME = {
    // background-color:
    base00: '#ffffff',
    // font-color value:
    base0B: theme.colors.blue[6],
    // font-color key:
    base0D: theme.colors.dark[9],
  }

  const TREE_THEME_DARK = {
    // background-color:
    base00: theme.colors.dark[7],
    // font-color value:
    base0B: theme.colors.blue[2],
    // font-color key:
    base0D: theme.colors.dark[1],
  }

  const [keyPathString, setKeyPathString] = useState<string | null>(null)

  const [selectedLanguage, setSelectedLanguage] = useState(
    router?.locale || 'en',
  )
  const translations = getTranslations(selectedLanguage)

  const [searchQuery, setSearchQuery] = useState('')

  const filteredTranslations = searchTranslationsObject(
    translations,
    searchQuery,
  )

  function handleSelectedLanguage(language: string): void {
    setSelectedLanguage(language)
  }

  function formatKeyPathToReverseString(keyPath: KeyPath): string {
    return [...keyPath].reverse().join('.')
  }

  function formatKeyPathToString(keyPath: KeyPath): string {
    return keyPath.toString()
  }

  function handleOpenEditMode(event: FormEvent, keyPath: KeyPath): void {
    event.stopPropagation()

    const keyPathAsString = formatKeyPathToString(keyPath)
    setKeyPathString(keyPathAsString)
  }

  function handleReset(keyPath: KeyPath): void {
    const key = formatKeyPathToReverseString(keyPath)

    deleteTranslation(key)

    setKeyPathString(null)
  }

  function handleSubmit(
    event: FormEventWithTranslation,
    keyPath: KeyPath,
    translation: string,
  ): void {
    event.preventDefault()

    if (event.nativeEvent.submitter.name === 'reset') {
      handleReset(keyPath)
    } else if (event.nativeEvent.submitter.name === 'save') {
      const key = formatKeyPathToReverseString(keyPath)
      const locale = selectedLanguage

      updateTranslation({ locale, key, translation })
    }

    setKeyPathString(null)
  }

  return (
    <>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'xs', sm: 'lg' }}
        justify={{ sm: 'flex-start' }}
        mb="lg"
      >
        <Select
          label={t('translationsView.select')}
          onChange={() => handleSelectedLanguage}
          defaultValue={selectedLanguage}
          data={[
            { value: 'en', label: t('en') as string },
            { value: 'de', label: t('de') as string },
          ]}
          w="45%"
        />

        <TextInput
          type="search"
          leftSection={<IconSearch size={18} />}
          onChange={event => setSearchQuery(event.target.value)}
          w="45%"
          label={t('translationsView.search.label')}
          placeholder={String(t('translationsView.search.placeholder'))}
        />
      </Flex>

      <Card
        shadow="sm"
        radius="sm"
        withBorder
        className={classes['translations-tree-container']}
      >
        {!Object.keys(filteredTranslations).length ? (
          <Text
            className={
              classes['translations-tree-container__no-translations-text']
            }
          >
            {t('translationsView.search.noResults')}
          </Text>
        ) : (
          <JSONTree
            hideRoot
            data={filteredTranslations}
            theme={colorScheme === 'light' ? TREE_THEME : TREE_THEME_DARK}
            getItemString={() => null}
            labelRenderer={([key]) => (
              <Text
                className={classes['translations-tree-container__label-text']}
              >
                {key}
              </Text>
            )}
            valueRenderer={(_, value, ...keyPath) => (
              <Box
                onClick={event => {
                  handleOpenEditMode(event, keyPath)
                }}
              >
                {formatKeyPathToString(keyPath) === keyPathString &&
                (hasRequiredRights(userRights, RIGHTS.TRANSLATION_UPDATE) ||
                  hasRequiredRights(userRights, RIGHTS.TRANSLATION_DELETE)) ? (
                  <form
                    onSubmit={(event: FormEventWithTranslation) => {
                      handleSubmit(
                        event,
                        keyPath,
                        event.target.translation.value,
                      )
                    }}
                  >
                    <Group>
                      <Input
                        name="translation"
                        defaultValue={value as string}
                        type="text"
                        variant="unstyled"
                        autoFocus
                      />

                      {hasRequiredRights(
                        userRights,
                        RIGHTS.TRANSLATION_UPDATE,
                      ) ? (
                        <Tooltip
                          label={t('translationsView.save')}
                          position="bottom"
                          withArrow
                        >
                          <ActionIcon type="submit" name="save">
                            <IconCheck size="1.125rem" />
                          </ActionIcon>
                        </Tooltip>
                      ) : null}

                      <Tooltip
                        label={t('translationsView.cancel')}
                        position="bottom"
                        withArrow
                      >
                        <ActionIcon type="reset">
                          <IconX
                            onClick={event => {
                              event.stopPropagation()
                              setKeyPathString(null)
                            }}
                            size="1.125rem"
                          />
                        </ActionIcon>
                      </Tooltip>

                      {hasRequiredRights(
                        userRights,
                        RIGHTS.TRANSLATION_DELETE,
                      ) ? (
                        <Tooltip
                          label={t('translationsView.reset')}
                          position="bottom"
                          withArrow
                        >
                          <ActionIcon type="submit" name="reset">
                            <IconArrowBackUp size="1.125rem" />
                          </ActionIcon>
                        </Tooltip>
                      ) : null}
                    </Group>
                  </form>
                ) : (
                  <Text
                    className={`${
                      classes['translations-tree-container__translation-text']
                    } ${
                      hasRequiredRights(
                        userRights,
                        RIGHTS.TRANSLATION_UPDATE,
                      ) ||
                      hasRequiredRights(userRights, RIGHTS.TRANSLATION_DELETE)
                        ? classes[
                            'translations-tree-container__translation-text--cursor-pointer'
                          ]
                        : null
                    }`}
                  >
                    {value as string}
                  </Text>
                )}
              </Box>
            )}
          />
        )}
      </Card>
    </>
  )
}
