import { Button, Card, PasswordInput, Title } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function SetPasswordForm() {
  const { t } = useTranslation()

  return (
    <Card w={450} shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        {t('SetPasswordView.title')}
      </Title>

      <PasswordInput
        placeholder={t('SetPasswordView.form.newPassword') as string}
        label={t('SetPasswordView.form.newPassword')}
        radius="md"
        withAsterisk
        mb="md"
      />

      <PasswordInput
        placeholder={t('SetPasswordView.form.confirmPassword') as string}
        label={t('SetPasswordView.form.confirmPassword')}
        radius="md"
        withAsterisk
        mb="md"
      />

      <Button mt="md" leftIcon={<IconCheck />}>
        {t('SetPasswordView.form.submit')}
      </Button>
    </Card>
  )
}
