/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

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
      <Stack gap="xs">
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

      <Stack gap="xs" mt="sm">
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
