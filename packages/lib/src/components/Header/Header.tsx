import {
  Box,
  Burger,
  Button,
  Code,
  ColorScheme,
  Flex,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Popover,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSelector } from './components/LanguageSelector'
import { SearchBar } from './components/SearchBar'
import { UserMenu } from './components/UserMenu'
import type { HeaderProps } from './types'

export function Header({
  isOpen,
  handleOpenNav,
  logo,
  version,
  user,
}: HeaderProps): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const [openColorSchemeMenu, setOpenColorSchemeMenu] = useState(false)
  const [openLanguageSelector, setLanguageSelector] = useState(false)

  const systemColorScheme: ColorScheme = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches
    ? 'light'
    : 'dark'

  function toggleColorSchemeMenu(): void {
    setOpenColorSchemeMenu(prev => !prev)
  }

  function toggleLanguageSelector(): void {
    setLanguageSelector(prev => !prev)
  }

  return (
    <MantineHeader height={{ base: 70 }} p="md" fixed>
      <Flex
        sx={{
          height: '100%',
        }}
        justify="space-between"
        align="center"
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={isOpen}
            onClick={handleOpenNav}
            size="sm"
            color={theme.colors.gray[5]}
            mr="xl"
          />
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing="xs" noWrap align="center">
            <Box>{logo}</Box>

            <Text size={21} mr="10" weight="500">
              {t('header.title')}
            </Text>

            {version ? (
              <>
                <Code>{version}</Code>

                {process.env.NODE_ENV === 'development' ? (
                  <Code>{process.env.NODE_ENV}</Code>
                ) : null}
              </>
            ) : null}
          </Group>
        </MediaQuery>

        <SearchBar />

        <Group noWrap>
          <Group noWrap>
            <Popover
              opened={openColorSchemeMenu}
              width={130}
              position="bottom"
              withArrow
              shadow="sm"
            >
              <Popover.Target>
                <Button
                  aria-label="darkmode-toggle"
                  leftIcon={
                    colorScheme === 'light' ? <IconSun /> : <IconMoon />
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color:
                      colorScheme === 'light'
                        ? theme.colors.gray[9]
                        : theme.colors.gray[5],
                    padding: 0,
                  }}
                  onClick={() => toggleColorSchemeMenu()}
                />
              </Popover.Target>

              <Popover.Dropdown p={0}>
                <Group
                  onClick={() => {
                    toggleColorScheme('light')
                    setOpenColorSchemeMenu(false)
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
                    setOpenColorSchemeMenu(false)
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
                    setOpenColorSchemeMenu(false)
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

            <LanguageSelector
              openLanguageSelector={openLanguageSelector}
              toggleLanguageSelector={toggleLanguageSelector}
            />
          </Group>

          {user && <UserMenu user={user} />}
        </Group>
      </Flex>
    </MantineHeader>
  )
}
