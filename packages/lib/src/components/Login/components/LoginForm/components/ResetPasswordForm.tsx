import { Button, Container, Group, Text, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import type { ResetPasswordProps } from './types'

export function ResetPasswordForm({
  setIsPasswordResetFormOpened,
  setIsResetPasswordSent,
}: ResetPasswordProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <Container p={0} m={0}>
      <form>
        <Text size="sm" fw="bold" my="md">
          {t('loginView.resetPassword.form.description')}
        </Text>

        <TextInput
          placeholder={String(t('loginView.resetPassword.form.placeholder'))}
          label={String(t('loginView.resetPassword.form.label'))}
          withAsterisk
          radius="sm"
          mb="md"
        />

        <Group>
          <Button
            mt="md"
            color="cyan"
            onClick={() => {
              setIsResetPasswordSent(true)
              setIsPasswordResetFormOpened(false)
            }}
          >
            {t('loginView.resetPassword.form.submitButton')}
          </Button>

          <Button
            mt="md"
            variant="light"
            color="cyan"
            onClick={() => {
              setIsPasswordResetFormOpened(false)
            }}
          >
            {t('loginView.resetPassword.form.cancelButton')}
          </Button>
        </Group>
      </form>
    </Container>
  )
}
