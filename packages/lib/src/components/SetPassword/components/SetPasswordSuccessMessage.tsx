import { Button, Center, Stack, Text, Title } from '@mantine/core'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

export function SetPasswordSuccessMessage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Center>
      <Stack>
        <Title order={4} mb="md">
          {t('setPasswordView.successMessage.title')}
        </Title>

        <Text size="sm">{t('setPasswordView.successMessage.text')}</Text>

        <NextLink
          href="/login"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <Button mt="md" fullWidth>
            {t('setPasswordView.successMessage.button')}
          </Button>
        </NextLink>
      </Stack>
    </Center>
  )
}
