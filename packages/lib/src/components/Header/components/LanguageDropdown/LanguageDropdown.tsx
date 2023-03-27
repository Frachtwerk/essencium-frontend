import {
  Button,
  Group,
  Popover,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconLanguage, IconWorld } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

type LanguageDropdownProps = {
  openLanguageDropdown: boolean
  toggleLanguageDropdown: () => void
}

export function LanguageDropdown({
  openLanguageDropdown,
  toggleLanguageDropdown,
}: LanguageDropdownProps): JSX.Element {
  const { t, i18n } = useTranslation()

  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const LANGUAGES = i18n.languages

  return (
    <Popover
      opened={openLanguageDropdown}
      width={130}
      position="bottom"
      withArrow
      shadow="sm"
    >
      <Popover.Target>
        <Button
          aria-label="language-dropdown"
          leftIcon={<IconLanguage />}
          style={{
            backgroundColor: 'transparent',
            color:
              colorScheme === 'light'
                ? theme.colors.gray[9]
                : theme.colors.gray[5],
            padding: 0,
          }}
          onClick={() => toggleLanguageDropdown()}
        />
      </Popover.Target>

      <Popover.Dropdown p={0}>
        {LANGUAGES.map(language => (
          <Group
            key={language}
            onClick={() => {}}
            sx={{
              padding: '0.7rem 0 0.5rem 1rem',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[9]
                    : theme.colors.gray[0],
              },
            }}
          >
            <IconWorld size={20} />

            <Text size="sm">
              {t(`header.languageDropdown.language.${language}`)}
            </Text>
          </Group>
        ))}
      </Popover.Dropdown>
    </Popover>
  )
}
