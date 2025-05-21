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
  PasswordChange,
  passwordChangeSchemaAdmin,
  passwordChangeSchemaUser,
} from '@frachtwerk/essencium-types'
import { Button, Flex, PasswordInput, Stack } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { type JSX, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'
import { PasswordStrengthIndicator } from '../../../../PasswordStrengthIndicator/PasswordStrengthIndicator'
import classes from './PasswordChangeForm.module.css'

type Props = {
  handlePasswordUpdate: (
    oldPassword: PasswordChange['password'],
    newPassword: PasswordChange['password'],
  ) => void
  isLoading: boolean
  isAdmin?: boolean
}

export function PasswordChangeForm({
  handlePasswordUpdate,
  isLoading,
  isAdmin,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const [passwordValue, setPasswordValue] = useState<string | null>(null)

  const { handleSubmit, control, formState } = useZodForm({
    schema: isAdmin ? passwordChangeSchemaAdmin : passwordChangeSchemaUser,
    defaultValues: {
      verification: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: PasswordChange): void {
    handlePasswordUpdate(data.password, data.verification)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" align="flex-start">
        <Stack className={classes['password-change-form__stack']}>
          <Controller
            name="verification"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                label={t(
                  'profileView.dataCard.tabs.passwordChange.content.currentPassword',
                )}
                withAsterisk
                error={
                  formState.errors?.verification?.message &&
                  t(formState.errors.verification.message)
                }
              />
            )}
          />

          <PasswordStrengthIndicator
            passwordValue={passwordValue}
            isAdmin={isAdmin}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  onChange={event => {
                    field.onChange(event)

                    setPasswordValue(event.target.value)
                  }}
                  value={field.value || ''}
                  label={t(
                    'profileView.dataCard.tabs.passwordChange.content.newPassword',
                  )}
                  withAsterisk
                />
              )}
            />
          </PasswordStrengthIndicator>

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                label={t(
                  'profileView.dataCard.tabs.passwordChange.content.confirmNewPassword',
                )}
                withAsterisk
                error={
                  formState.errors?.confirmPassword?.message &&
                  t(formState.errors.confirmPassword.message)
                }
              />
            )}
          />
        </Stack>

        <Button
          type="submit"
          className={classes['password-change-form__button']}
          loading={isLoading}
        >
          {t('profileView.dataCard.tabs.passwordChange.content.savePassword')}
        </Button>
      </Flex>
    </form>
  )
}
