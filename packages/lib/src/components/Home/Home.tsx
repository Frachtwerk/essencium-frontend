import {
  Button,
  Center,
  Container,
  Flex,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import {
  IconBrandReact,
  IconSearch,
  IconSettings,
  IconUser,
  IconUserEdit,
  IconUsers,
} from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export function Home(): JSX.Element {
  const { t } = useTranslation()
  const router = useRouter()

  const theme = useMantineTheme()

  return (
    <Center
      sx={{
        width: '100%',
        height: '80%',
      }}
    >
      <Flex direction="column" gap="lg">
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
          <Stack>
            <Button
              onClick={() => openSpotlight()}
              variant="outline"
              leftIcon={<IconSearch />}
              fullWidth
            >
              {t('homeView.action.search')}
            </Button>
            <Button
              onClick={() => router.push('/users')}
              variant="outline"
              leftIcon={<IconUsers />}
              fullWidth
            >
              {t('homeView.action.users')}
            </Button>
            <Button
              onClick={() => router.push('/profile')}
              variant="outline"
              leftIcon={<IconUserEdit />}
              fullWidth
            >
              {t('homeView.action.profile')}
            </Button>
          </Stack>
        </Container>
      </Flex>
    </Center>
  )
}
