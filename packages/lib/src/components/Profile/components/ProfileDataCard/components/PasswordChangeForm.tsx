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
  PasswordStrengthRules,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Flex,
  PasswordInput,
  Popover,
  Stack,
  Text,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { type JSX, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'
import classes from './PasswordChangeForm.module.css'
import { PasswordRequirement } from './PasswordRequirement'

type Props = {
  handlePasswordUpdate: (
    oldPassword: PasswordChange['password'],
    newPassword: PasswordChange['password'],
  ) => void
  isLoading: boolean
  isAdmin?: boolean
}

type PasswordRequirementType = {
  id: string
  requirement: RegExp
  label: string
}[]

export function PasswordChangeForm({
  handlePasswordUpdate,
  isLoading,
  isAdmin,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const [popoverOpened, setPopoverOpened] = useState(false)

  const [passwordValue, setPasswordValue] = useState<string | null>(null)

  const passwordRequirements: PasswordRequirementType = [
    ...Object.entries(PasswordStrengthRules).map(([key, value]) => {
      return {
        id: key,
        requirement: value,
        label: t(
          `profileView.dataCard.tabs.passwordChange.passwordStrength.${key}`,
        ),
      }
    }),
    {
      id: 'length',
      requirement: isAdmin ? /.{20,}/ : /.{12,}/,
      label: t(
        'profileView.dataCard.tabs.passwordChange.passwordStrength.length',
        { passwordLength: isAdmin ? 20 : 12 },
      ),
    },
  ]

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
                variant="filled"
              />
            )}
          />

          <Box className={classes['password-change-form__error-box']}>
            {formState.errors.verification && (
              <Text className={classes['password-change-form__error-text']}>
                {formState.errors.verification?.message
                  ? String(t(formState.errors.verification.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className={classes['password-change-form__stack']}>
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: 'pop' }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
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
                      variant="filled"
                    />
                  )}
                />
              </div>
            </Popover.Target>

            <Popover.Dropdown>
              {passwordRequirements.map(requirement => (
                <PasswordRequirement
                  key={requirement.id}
                  label={requirement.label}
                  meets={requirement.requirement.test(passwordValue || '')}
                />
              ))}
            </Popover.Dropdown>
          </Popover>

          <Box className={classes['password-change-form__error-box']}>
            {formState.errors.password && (
              <Text className={classes['password-change-form__error-text']}>
                {formState.errors.password?.message
                  ? String(t(formState.errors.password.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className={classes['password-change-form__stack']}>
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
                variant="filled"
              />
            )}
          />

          <Box className={classes['password-change-form__error-box']}>
            {formState.errors.confirmPassword && (
              <Text className={classes['password-change-form__error-text']}>
                {formState.errors.confirmPassword?.message
                  ? String(t(formState.errors.confirmPassword.message))
                  : null}
              </Text>
            )}
          </Box>
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
