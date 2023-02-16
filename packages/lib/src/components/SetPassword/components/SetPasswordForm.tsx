import { Button, Card, PasswordInput, Title } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function SetPasswordForm(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card w={450} shadow="sm" p="lg" radius="sm" withBorder>
      <Title order={2} mb="md">
        {t('setPasswordView.title')}
      </Title>

      <PasswordInput
        placeholder={String(t('setPasswordView.form.newPassword'))}
        label={t('setPasswordView.form.newPassword')}
        radius="sm"
        withAsterisk
        mb="md"
      />

      <PasswordInput
        placeholder={String(t('setPasswordView.form.confirmPassword'))}
        label={t('setPasswordView.form.confirmPassword')}
        radius="sm"
        withAsterisk
        mb="md"
      />

      <Button mt="md" leftIcon={<IconCheck />}>
        {t('setPasswordView.form.submit')}
      </Button>
    </Card>
  )
}
