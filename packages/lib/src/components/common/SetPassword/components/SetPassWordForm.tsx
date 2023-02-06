import { Button, Card, PasswordInput, Title } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function SetPasswordForm() {
  const { t } = useTranslation()

  return (
    <Card w={450} shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        {t('setPasswordView.title')}
      </Title>

      <PasswordInput
        placeholder={t('setPasswordView.form.newPassword') as string}
        label={t('setPasswordView.form.newPassword')}
        radius="md"
        withAsterisk
        mb="md"
      />

      <PasswordInput
        placeholder={t('setPasswordView.form.confirmPassword') as string}
        label={t('setPasswordView.form.confirmPassword')}
        radius="md"
        withAsterisk
        mb="md"
      />

      <Button mt="md" leftIcon={<IconCheck />}>
        {t('setPasswordView.form.submit')}
      </Button>
    </Card>
  )
}