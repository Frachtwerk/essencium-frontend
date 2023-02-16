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
            color={
              theme.colorScheme === 'dark'
                ? theme.colors.gray[5]
                : theme.colors.gray[1]
            }
            strokeWidth={1}
          />
        </Center>

        <Container w={300}>
          <Group position="apart" mt="lg">
            <Text
              onClick={() => openSpotlight()}
              sx={{ cursor: 'pointer' }}
              color={
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[5]
                  : theme.colors.gray[6]
              }
            >
              {t('homeView.action.search')}
            </Text>

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
            <RouterLink to="users" style={{ textDecoration: 'none' }}>
              <Text
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[5]
                    : theme.colors.gray[6]
                }
              >
                {t('homeView.action.users')}
              </Text>
            </RouterLink>

            <RouterLink to="users">
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
            <RouterLink to="profile" style={{ textDecoration: 'none' }}>
              <Text
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[5]
                    : theme.colors.gray[6]
                }
              >
                {t('homeView.action.profile')}
              </Text>
            </RouterLink>

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
