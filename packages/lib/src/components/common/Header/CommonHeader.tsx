import {
  ActionIcon,
  Burger,
  Flex,
  Group,
  Header,
  MediaQuery,
  Text,
  ThemeIcon,
} from '@mantine/core'
import { IconBrandReact, IconLanguage, IconMoon } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

import { SearchBar } from './components/SearchBar'
import { UserMenu } from './components/UserMenu'
import { CommonHeaderProps } from './types'

export function CommonHeader({ isOpen, handleOpenNav }: CommonHeaderProps) {
  const { t } = useTranslation()

  return (
    <Header height={{ base: 70 }} p="md">
      <Flex
        sx={{
          height: '100%',
          marginTop: '2px',
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

            <Text size={24} mx={4}>
              {t('header.title')}
            </Text>
          </Group>
        </MediaQuery>

        <SearchBar />

        <Group noWrap>
          <Group noWrap>
            <ActionIcon
              data-testid="darkmode-toggle"
              color="dark"
              sx={{
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
              }}
            >
              <IconMoon />
            </ActionIcon>

            <ActionIcon
              data-testid="language-toggle"
              color="dark"
              sx={{
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
              }}
            >
              <IconLanguage />
            </ActionIcon>
          </Group>

          <UserMenu />
        </Group>
      </Flex>
    </Header>
  )
}
