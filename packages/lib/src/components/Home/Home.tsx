import { Button, Center, Container, Flex, Stack } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { IconSearch, IconUserEdit, IconUsers } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export function Home(): JSX.Element {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Center
      sx={{
        width: '100%',
        height: '80%',
      }}
    >
      <Flex direction="column" gap="lg">
        <Center my="xl">
          <Image
            src="/img/web/emblem_400x400px.svg"
            alt={t('header.logo')}
            width={200}
            height={200}
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
