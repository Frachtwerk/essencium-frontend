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
import classes from './SetPasswordForm.module.css'

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
              classNames={{
                root: classes['set-password-form__text-input--root'],
                label: classes['set-password-form__text-input--label'],
              }}
            />
          )}
        />

        <Box className={classes['set-password-form__error-box']}>
          {formState.errors.password && (
            <Text className={classes['set-password-form__error-text']}>
              {formState.errors.password?.message
                ? String(t(formState.errors.password.message))
                : null}
            </Text>
          )}
        </Box>
      </Stack>

      <Stack gap="xs" className={classes['set-password-form__stack']}>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={String(t('setPasswordView.form.confirmPassword'))}
              label={t('setPasswordView.form.confirmPassword')}
              withAsterisk
              classNames={{
                label: classes['set-password-form__text-input--label'],
                root: classes['set-password-form__text-input--root'],
              }}
            />
          )}
        />

        <Box className={classes['set-password-form__error-box']}>
          {formState.errors.confirmPassword && (
            <Text className={classes['set-password-form__error-text']}>
              {formState.errors.confirmPassword?.message
                ? String(t(formState.errors.confirmPassword.message))
                : null}
            </Text>
          )}
        </Box>
      </Stack>

      <Button
        className={classes['set-password-form__button']}
        fullWidth
        type="submit"
      >
        {t('setPasswordView.form.submit')}
      </Button>
    </form>
  )
}
