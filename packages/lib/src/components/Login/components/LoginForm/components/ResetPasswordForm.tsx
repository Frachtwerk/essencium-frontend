import { Box, Button, Container, Group, Text, TextInput } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ResetPassword, resetPasswordSchema } from 'types'

import { useZodForm } from '../../../../../hooks'

type Props = {
  setIsPasswordResetFormOpened: Dispatch<SetStateAction<boolean>>
  handlePasswordReset: (email: ResetPassword['email']) => void
}

export function ResetPasswordForm({
  setIsPasswordResetFormOpened,
  handlePasswordReset,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, formState } = useZodForm({
    schema: resetPasswordSchema,
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(email: ResetPassword): void {
    handlePasswordReset(email.email)
  }

  return (
    <Container p={0} m={0}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text size="sm" fw="bold" my="md">
          {t('loginView.resetPassword.form.description')}
        </Text>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={String(
                t('loginView.resetPassword.form.placeholder')
              )}
              label={String(t('loginView.resetPassword.form.label'))}
              withAsterisk
              radius="sm"
              mb="md"
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.email && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.email?.message}
            </Text>
          )}
        </Box>

        <Group>
          <Button mt="lg" type="submit" color="cyan">
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
