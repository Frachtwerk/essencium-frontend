import {
  ActionIcon,
  Burger,
  Flex,
  Group,
  Header as MantineHeader,
  HoverCard,
  MediaQuery,
  Text,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconBrandReact, IconMoon, IconSun } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

import { SearchBar } from './components/SearchBar'
import { UserMenu } from './components/UserMenu'
import type { HeaderProps } from './types'

const LANGUAGES = {
  DE: 'de',
  EN: 'en',
}

export function Header({ isOpen, handleOpenNav }: HeaderProps): JSX.Element {
  const { t, i18n } = useTranslation()

  const theme = useMantineTheme()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  function onToggleLanguage() {
    const selectedLanguage =
      i18n.language === LANGUAGES.EN ? LANGUAGES.DE : LANGUAGES.EN
    i18n.changeLanguage(selectedLanguage)
  }

  return (
    <MantineHeader height={{ base: 70 }} p="md">
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
            color="black"
            mr="xl"
          />
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing="sm" noWrap>
            <ThemeIcon size="lg" variant="filled">
              <IconBrandReact />
            </ThemeIcon>

            <Text size={24} mx="xs">
              {t('header.title')}
            </Text>
          </Group>
        </MediaQuery>

        <SearchBar />

        <Group noWrap>
          <Group noWrap>
            <HoverCard>
              <HoverCard.Target>
                <ActionIcon
                  data-testid="darkmode-toggle"
                  onClick={() => toggleColorScheme()}
                  color="dark"
                  sx={{
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.gray[9]
                          : theme.colors.gray[0],
                    },
                  }}
                >
                  {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
                </ActionIcon>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                {colorScheme === 'light' ? (
                  <Text size="sm">{t('header.themeToggle.darkMode')}</Text>
                ) : (
                  <Text size="sm">{t('header.themeToggle.lightMode')}</Text>
                )}
              </HoverCard.Dropdown>
            </HoverCard>

            <HoverCard>
              <HoverCard.Target>
                <ActionIcon
                  data-testid="language-toggle"
                  color="dark"
                  onClick={() => {
                    onToggleLanguage()
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.gray[9]
                          : theme.colors.gray[0],
                    },
                  }}
                >
                  <Text data-testid="selected-language" size="lg">
                    {i18n.language.toUpperCase()}
                  </Text>
                </ActionIcon>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                {i18n.language === LANGUAGES.EN ? (
                  <Text size="sm">{t('header.languageToggle.german')}</Text>
                ) : (
                  <Text size="sm">{t('header.languageToggle.english')}</Text>
                )}
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
          <UserMenu />
        </Group>
      </Flex>
    </MantineHeader>
  )
}
