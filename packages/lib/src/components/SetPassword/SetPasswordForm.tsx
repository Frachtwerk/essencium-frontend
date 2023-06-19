import {
  setPasswordFormSchema,
  SetPasswordFormType,
  SetPasswordInput,
} from '@frachtwerk/essencium-types'
import { Box, Button, PasswordInput, Stack, Text } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../hooks'

type Props = {
  handleSetPassword: (password: SetPasswordInput['password']) => void
}

export function SetPasswordForm({ handleSetPassword }: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, formState } = useZodForm({
    schema: setPasswordFormSchema,
  })

  function onSubmit({ password }: SetPasswordFormType): void {
    handleSetPassword(password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="xs">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={String(t('setPasswordView.form.newPassword'))}
              label={t('setPasswordView.form.newPassword')}
              withAsterisk
              radius="sm"
              mb="md"
              styles={{
                label: {
                  fontWeight: 'bold',
                },
              }}
            />
          )}
        />

        <Box mt="-1.5rem" h="0.8rem">
          {formState.errors.password && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.password?.message
                ? String(t(formState.errors.password.message))
                : null}
            </Text>
          )}
        </Box>
      </Stack>

      <Stack spacing="xs" mt="sm">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={String(t('setPasswordView.form.confirmPassword'))}
              label={t('setPasswordView.form.confirmPassword')}
              withAsterisk
              radius="sm"
              mb="md"
              styles={{
                label: {
                  fontWeight: 'bold',
                },
              }}
            />
          )}
        />

        <Box mt="-1.5rem" h="0.8rem">
          {formState.errors.confirmPassword && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.confirmPassword?.message
                ? String(t(formState.errors.confirmPassword.message))
                : null}
            </Text>
          )}
        </Box>
      </Stack>

      <Button mt="md" fullWidth type="submit">
        {t('setPasswordView.form.submit')}
      </Button>
    </form>
  )
}
