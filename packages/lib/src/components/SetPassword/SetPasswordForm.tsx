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

'use client'

import {
  setPasswordFormSchema,
  SetPasswordFormType,
  SetPasswordInput,
} from '@frachtwerk/essencium-types'
import { Button, Stack, Text } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { type ChangeEvent, type JSX, useState } from 'react'

import { useZodForm } from '../../hooks'
import { ControlledPasswordInput } from '../Form'
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator'
import classes from './SetPasswordForm.module.css'

type Props = {
  handleSetPassword: (password: SetPasswordInput['password']) => void
  isAdmin?: boolean
}

/**
 * SetPasswordForm component for handling password setting and validation
 * @param handleSetPassword - Callback function to handle password submission
 * @param isAdmin - Optional flag to indicate if the user is an admin (affects password requirements)
 */
export function SetPasswordForm({ handleSetPassword, isAdmin }: Props): JSX.Element {
  const { t } = useTranslation()
  const [passwordValue, setPasswordValue] = useState<string | null>(null)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useZodForm({
    schema: setPasswordFormSchema,
  })

  function onSubmit({ password }: SetPasswordFormType): void {
    handleSetPassword(password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <PasswordStrengthIndicator
          passwordValue={passwordValue}
          isAdmin={isAdmin}
          offset={5}
          position="bottom-start"
          width={300}
          opened={isPasswordFocused}
        >
          <ControlledPasswordInput
            name="password"
            control={control}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPasswordValue(event.target.value)
            }}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder={String(t('setPasswordView.form.newPassword'))}
            label={t('setPasswordView.form.newPassword')}
            withAsterisk
            error={errors.password?.message}
            classNames={{
              label: classes['set-password-form__text-input--label'],
              input: classes['set-password-form__text-input'],
            }}
          />
        </PasswordStrengthIndicator>

        <ControlledPasswordInput
          name="confirmPassword"
          control={control}
          placeholder={String(t('setPasswordView.form.confirmPassword'))}
          label={t('setPasswordView.form.confirmPassword')}
          withAsterisk
          error={errors.confirmPassword?.message}
          classNames={{
            label: classes['set-password-form__text-input--label'],
            input: classes['set-password-form__text-input'],
          }}
        />

        <Text size="sm" c="dimmed" mt={-8}>
          {t('setPasswordView.form.passwordRequirements')}
        </Text>

        <Button
          fullWidth
          type="submit"
          className={classes['set-password-form__submit-button']}
        >
          {t('setPasswordView.form.submit')}
        </Button>
      </Stack>
    </form>
  )
}
