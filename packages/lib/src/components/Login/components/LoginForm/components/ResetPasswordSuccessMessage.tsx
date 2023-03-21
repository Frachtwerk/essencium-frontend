import { Center, Stack, Text, Title } from '@mantine/core'
import { IconMailForward } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export function ResetPasswordSuccessMessage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Center h={200} mx="auto">
      <Stack>
        <IconMailForward size={40} stroke={1} />

        <Title order={4}>
          {t('loginView.resetPassword.successMessage.title')}
        </Title>

        <Text size="xs" mt="xs">
          {t('loginView.resetPassword.successMessage.description')}
        </Text>
      </Stack>
    </Center>
  )
}
