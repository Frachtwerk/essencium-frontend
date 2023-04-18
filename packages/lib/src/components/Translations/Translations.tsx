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

type CustomEventType = FormEvent<HTMLFormElement> & {
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
  const [keyPathString, setKeyPathString] = useState<string | null>(null)
  const [language, setLanguage] = useState('en')

  const theme = useMantineTheme()

  const treeTheme = {
    // background-color:
    base00: '#ffffff',
    // font-color value:
    base0B: theme.colors.blue[6],

    // font-color key:
    base0D: theme.colors.dark[9],
  }
  const translations = getTranslations(language)

  function handleLanguageFilter(languageValue: string): void {
    setLanguage(languageValue)
  }

  function formateKeys(keyPath: KeyPath): string {
    return [...keyPath].reverse().join('.')
  }

  function handleOpenEditMode(event: FormEvent, path: string): void {
    event.stopPropagation()
    setKeyPathString(path)
  }

  function handleSubmit(
    event: FormEvent,
    keyPath: KeyPath,
    translation: string
  ): void {
    event.preventDefault()
    const variable = formateKeys(keyPath)
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
        onChange={handleLanguageFilter}
        defaultValue="en"
        data={[
          { value: 'en', label: 'English' },
          { value: 'de', label: 'German' },
        ]}
        mb="xl"
        mt="xl"
        w="30%"
      />
      <Card shadow="sm" pl="lg" pt="lg" radius="sm" withBorder>
        <JSONTree
          hideRoot
          data={translations}
          theme={treeTheme}
          getItemString={() => null}
          // eslint-disable-next-line react/no-unstable-nested-components
          labelRenderer={([key]) => <Text fz="sm">{key}</Text>}
          // eslint-disable-next-line react/no-unstable-nested-components
          valueRenderer={(valueAsString, value, ...keyPath) => (
            <Box
              onClick={event => {
                handleOpenEditMode(event, keyPath.toString())
              }}
            >
              {keyPath.toString() === keyPathString ? (
                <form
                  onSubmit={(event: CustomEventType) => {
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
