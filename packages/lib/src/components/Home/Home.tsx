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
} from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

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
            <NextLink href="/users" style={{ textDecoration: 'none' }}>
              <Text
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[5]
                    : theme.colors.gray[6]
                }
              >
                {t('homeView.action.users')}
              </Text>
            </NextLink>

            <NextLink href="/users">
              <ActionIcon
                color={theme.colors.blue[6]}
                size="md"
                variant="filled"
              >
                <IconUser size={16} />
              </ActionIcon>
            </NextLink>
          </Group>

          <Group position="apart" mt="md">
            <NextLink href="/profile" style={{ textDecoration: 'none' }}>
              <Text
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[5]
                    : theme.colors.gray[6]
                }
              >
                {t('homeView.action.profile')}
              </Text>
            </NextLink>

            <NextLink href="profile">
              <ActionIcon
                color={theme.colors.blue[6]}
                size="md"
                variant="filled"
              >
                <IconSettings size={16} />
              </ActionIcon>
            </NextLink>
          </Group>
        </Container>
      </Flex>
    </Center>
  )
}
