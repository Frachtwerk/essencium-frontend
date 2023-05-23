/* eslint-disable react/no-unstable-nested-components */
import { TranslationInput } from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  Input,
  Select,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import {
  IconArrowBackUp,
  IconCheck,
  IconSearch,
  IconX,
} from '@tabler/icons-react'
import { t } from 'i18next'
import { FormEvent, useState } from 'react'
import { JSONTree, KeyPath } from 'react-json-tree'

type FormEventWithTranslation = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>['target'] & {
    translation: {
      value: string
    }
  }
}

type Props = {
  getTranslations: (lang: string) => Record<string, string> | undefined
  updateTranslation: ({ locale, key, translation }: TranslationInput) => void
  deleteTranslation: (key: TranslationInput['key']) => void
}

export function searchTranslationsObject(
  object: Record<string, string> | undefined,
  searchQuery: string
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
          searchQuery
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
}: Props): JSX.Element {
  const theme = useMantineTheme()

  const TREE_THEME = {
    // background-color:
    base00: '#ffffff',
    // font-color value:
    base0B: theme.colors.blue[6],

    // font-color key:
    base0D: theme.colors.dark[9],
  }

  const [keyPathString, setKeyPathString] = useState<string | null>(null)

  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const translations = getTranslations(selectedLanguage)

  const [searchQuery, setSearchQuery] = useState('')

  const filteredTranslations = searchTranslationsObject(
    translations,
    searchQuery
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

  function handleSubmit(
    event: FormEvent,
    keyPath: KeyPath,
    translation: string
  ): void {
    event.preventDefault()

    const key = formatKeyPathToReverseString(keyPath)
    const locale = selectedLanguage

    updateTranslation({ locale, key, translation })

    setKeyPathString(null)
  }

  function handleReset(keyPath: KeyPath): void {
    const key = formatKeyPathToReverseString(keyPath)

    deleteTranslation(key)

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
          onChange={handleSelectedLanguage}
          defaultValue={selectedLanguage}
          data={[
            { value: 'en', label: t('en') as string },
            { value: 'de', label: t('de') as string },
          ]}
          w="45%"
        />

        <TextInput
          type="search"
          icon={<IconSearch size={18} />}
          onChange={event => setSearchQuery(event.target.value)}
          w="45%"
          label={t('translationsView.search.label')}
          placeholder={String(t('translationsView.search.placeholder'))}
        />
      </Flex>

      <Card shadow="sm" pl="lg" pt="lg" radius="sm" withBorder>
        {!Object.keys(filteredTranslations).length ? (
          <Text fz="sm" color="gray">
            {t('translationsView.search.noResults')}
          </Text>
        ) : (
          <JSONTree
            hideRoot
            data={filteredTranslations}
            theme={TREE_THEME}
            getItemString={() => null}
            labelRenderer={([key]) => <Text fz="sm">{key}</Text>}
            valueRenderer={(_, value, ...keyPath) => (
              <Box
                onClick={event => {
                  handleOpenEditMode(event, keyPath)
                }}
              >
                {formatKeyPathToString(keyPath) === keyPathString ? (
                  <form
                    onSubmit={(event: FormEventWithTranslation) => {
                      handleSubmit(
                        event,
                        keyPath,
                        event.target.translation.value
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

                      <Tooltip
                        label={t('translationsView.save')}
                        color={theme.colors.gray[6]}
                        pl="md"
                        position="bottom"
                        withArrow
                      >
                        <ActionIcon type="submit">
                          <IconCheck
                            size="1.125rem"
                            color={theme.colors.blue[4]}
                          />
                        </ActionIcon>
                      </Tooltip>

                      <Tooltip
                        label={t('translationsView.cancel')}
                        color={theme.colors.gray[6]}
                        pl="md"
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

                      <Tooltip
                        label={t('translationsView.reset')}
                        color={theme.colors.gray[6]}
                        pl="md"
                        position="bottom"
                        withArrow
                      >
                        <ActionIcon onClick={() => handleReset(keyPath)}>
                          <IconArrowBackUp size="1.125rem" />
                        </ActionIcon>
                      </Tooltip>
                    </Group>

                    <Divider
                      label={t('translationsView.divider')}
                      m="sm"
                      w="80%"
                    />
                  </form>
                ) : (
                  <Text
                    fz="sm"
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    {value as string}
                    <Divider my="sm" w="60%" />
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
