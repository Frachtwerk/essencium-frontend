import { Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export function ResetPasswordSuccessMessage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <Title order={4}> {t('resetPassword.successMessage.title')} </Title>

      <Text size="xs" mt="sm">
        {t('resetPassword.successMessage.description')}
      </Text>
    </>
  )
}
