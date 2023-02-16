import {
  ActionIcon,
  Center,
  Container,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import {
  IconBrandReact,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons'
import { Link as RouterLink } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function Home(): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <Center
      sx={{
        width: '100%',
        height: '80%',
      }}
    >
      <Flex direction="column" gap="md">
        <Center>
          <IconBrandReact
            size={220}
            color={theme.colors.gray[1]}
            strokeWidth={1}
          />
        </Center>

        <Container w={300}>
          <Group position="apart" mt="lg">
            <Text color={theme.colors.gray[6]}>{t('home.action.search')}</Text>

            <ActionIcon
              color={theme.colors.blue[6]}
              size="md"
              variant="filled"
              onClick={() => openSpotlight()}
            >
              <IconSearch size={16} />
            </ActionIcon>
          </Group>

          <Group position="apart" mt="md">
            <Text color={theme.colors.gray[6]}>{t('home.action.users')}</Text>

            <RouterLink to="users" aria-label="users">
              <ActionIcon
                color={theme.colors.blue[6]}
                size="md"
                variant="filled"
              >
                <IconUser size={16} />
              </ActionIcon>
            </RouterLink>
          </Group>

          <Group position="apart" mt="md">
            <Text color={theme.colors.gray[6]}>{t('home.action.profile')}</Text>

            <RouterLink to="profile">
              <ActionIcon
                color={theme.colors.blue[6]}
                size="md"
                variant="filled"
              >
                <IconSettings size={16} />
              </ActionIcon>
            </RouterLink>
          </Group>
        </Container>
      </Flex>
    </Center>
  )
}
