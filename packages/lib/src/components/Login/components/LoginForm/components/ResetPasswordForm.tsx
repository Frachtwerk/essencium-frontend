import { Button, Container, Group, Text, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import type { ResetPasswordProps } from './types'

export function ResetPasswordForm({
  setOpen,
  setSent,
}: ResetPasswordProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <Container w={358} h={224} p={0} m={0}>
      <form>
        <Text size="sm" fw="bold" my="md">
          {t('loginView.resetPassword.form.description')}
        </Text>

        <TextInput
          placeholder={t('loginView.resetPassword.form.placeholder') as string}
          label={t('loginView.resetPassword.form.label') as string}
          withAsterisk
          radius="sm"
          mb="md"
        />

        <Group>
          <Button mt="md" color="cyan" onClick={() => setSent(true)}>
            {t('loginView.resetPassword.form.submitButton')}
          </Button>

          <Button
            mt="md"
            variant="light"
            color="cyan"
            onClick={() => setOpen(false)}
          >
            {t('loginView.resetPassword.form.cancelButton')}
          </Button>
        </Group>
      </form>
    </Container>
  )
}
