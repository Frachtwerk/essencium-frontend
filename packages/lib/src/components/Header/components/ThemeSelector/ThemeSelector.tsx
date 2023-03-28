import {
  Button,
  ColorScheme,
  Group,
  Popover,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ThemeSelector(): JSX.Element {
  const { t } = useTranslation()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const [hasSelectedLight, setSelectedLight] = useState(false)
  const [hasSelectedDark, setSelectedDark] = useState(false)

  const systemColorScheme: ColorScheme = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches
    ? 'light'
    : 'dark'

  return (
    <Popover width={130} position="bottom" withArrow shadow="sm">
      <Popover.Target>
        <Button
          aria-label="theme-selector"
          leftIcon={
            colorScheme === 'light' ? (
              <IconSun
                color={
                  colorScheme === 'light' && hasSelectedLight
                    ? theme.colors.blue[6]
                    : theme.colors.gray[9]
                }
              />
            ) : (
              <IconMoon
                color={
                  colorScheme === 'dark' && hasSelectedDark
                    ? theme.colors.blue[6]
                    : theme.colors.gray[5]
                }
              />
            )
          }
          style={{
            backgroundColor: 'transparent',
            color:
              colorScheme === 'light'
                ? theme.colors.gray[9]
                : theme.colors.gray[5],
            padding: 0,
          }}
        />
      </Popover.Target>

      <Popover.Dropdown p={0}>
        <Group
          onClick={() => {
            toggleColorScheme('light')
            setSelectedLight(true)
          }}
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
          <IconSun size={20} />

          <Text size="sm">{t('header.themeToggle.lightMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            toggleColorScheme('dark')
            setSelectedDark(true)
          }}
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
          <IconMoon size={20} />

          <Text size="sm">{t('header.themeToggle.darkMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            toggleColorScheme(systemColorScheme)
            setSelectedLight(false)
            setSelectedDark(false)
          }}
          sx={{
            padding: '0.7rem 0 0.7rem 1rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[9]
                  : theme.colors.gray[0],
            },
          }}
        >
          <IconDeviceLaptop size={20} />

          <Text size="sm">{t('header.themeToggle.systemMode')}</Text>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}
