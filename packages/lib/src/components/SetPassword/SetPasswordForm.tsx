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
import { Button, Stack } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

import { useZodForm } from '../../hooks'
import { ControlledPasswordInput } from '../Form'
import classes from './SetPasswordForm.module.css'

type Props = {
  handleSetPassword: (password: SetPasswordInput['password']) => void
}

export function SetPasswordForm({ handleSetPassword }: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control } = useZodForm({
    schema: setPasswordFormSchema,
  })

  function onSubmit({ password }: SetPasswordFormType): void {
    handleSetPassword(password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <ControlledPasswordInput
          name="password"
          control={control}
          placeholder={String(t('setPasswordView.form.newPassword'))}
          label={t('setPasswordView.form.newPassword')}
          withAsterisk
          classNames={{
            label: classes['set-password-form__text-input--label'],
          }}
        />

        <ControlledPasswordInput
          name="confirmPassword"
          control={control}
          placeholder={String(t('setPasswordView.form.confirmPassword'))}
          label={t('setPasswordView.form.confirmPassword')}
          withAsterisk
          classNames={{
            label: classes['set-password-form__text-input--label'],
          }}
        />

        <Button fullWidth type="submit">
          {t('setPasswordView.form.submit')}
        </Button>
      </Stack>
    </form>
  )
}
