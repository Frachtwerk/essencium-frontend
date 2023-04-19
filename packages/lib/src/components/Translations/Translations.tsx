/* eslint-disable react/no-unstable-nested-components */
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Group,
  Input,
  Select,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
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
}

export function Translations({ getTranslations }: Props): JSX.Element {
  const theme = useMantineTheme()

  const [keyPathString, setKeyPathString] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const TREE_THEME = {
    // background-color:
    base00: '#ffffff',
    // font-color value:
    base0B: theme.colors.blue[6],

    // font-color key:
    base0D: theme.colors.dark[9],
  }
  const translations = getTranslations(selectedLanguage)

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
    const variable = formatKeyPathToReverseString(keyPath)
    const newTranslation = {
      variable,
      translation,
    }
    console.log(newTranslation)
    setKeyPathString(null)
  }

  return (
    <>
      <Select
        label={t('translationsView.select')}
        onChange={handleSelectedLanguage}
        defaultValue={selectedLanguage}
        data={[
          { value: 'en', label: t('en') as string },
          { value: 'de', label: t('de') as string },
        ]}
        mb="xl"
        mt="xl"
        w="30%"
      />

      <Card shadow="sm" pl="lg" pt="lg" radius="sm" withBorder>
        <JSONTree
          hideRoot
          data={translations}
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
                    handleSubmit(event, keyPath, event.target.translation.value)
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

                    <ActionIcon type="submit">
                      <IconCheck size="1.125rem" color={theme.colors.blue[4]} />
                    </ActionIcon>

                    <ActionIcon type="reset">
                      <IconX
                        onClick={event => {
                          event.stopPropagation()
                          setKeyPathString(null)
                        }}
                        size="1.125rem"
                      />
                    </ActionIcon>
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
      </Card>
    </>
  )
}
