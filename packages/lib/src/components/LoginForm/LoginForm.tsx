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
  LoginForm as TLoginForm,
  loginFormSchema,
  ResetPassword,
} from '@frachtwerk/essencium-types'
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Transition,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Dispatch, type JSX, SetStateAction } from 'react'

import { useZodForm } from '../../hooks'
import { ControlledPasswordInput, ControlledTextInput } from '../Form'
import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'

type Props = {
  handleLogin: (name: string, pw: string) => void
  handlePasswordReset: (email: ResetPassword['email']) => void
  setIsPasswordResetFormOpened: Dispatch<SetStateAction<boolean>>
  isPasswordResetFormOpened: boolean
  isResetPasswordSent: boolean
  isResettingPassword: boolean
}

export function LoginForm({
  handleLogin,
  handlePasswordReset,
  setIsPasswordResetFormOpened,
  isPasswordResetFormOpened,
  isResetPasswordSent,
  isResettingPassword,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control } = useZodForm({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(credentials: TLoginForm): void {
    handleLogin(credentials.email, credentials.password)
  }

  return (
    <Box className="xs:w-[400px] w-[300px]">
      <Transition
        mounted={!isPasswordResetFormOpened && !isResetPasswordSent}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
        exitDuration={0}
      >
        {styles => (
          <div style={styles}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              data-testid="login-form"
            >
              <ControlledTextInput
                name="email"
                control={control}
                placeholder={String(t('loginView.form.emailPlaceholder'))}
                label={t('loginView.form.email')}
                required
                withAsterisk
              />

              <ControlledPasswordInput
                name="password"
                control={control}
                placeholder={String(t('loginView.form.passwordPlaceholder'))}
                label={t('loginView.form.password')}
                required
                className="mt-xs"
                withAsterisk
              />

              <Group>
                <Anchor
                  component="button"
                  size="xs"
                  fw="bold"
                  onClick={() => setIsPasswordResetFormOpened(true)}
                  role="link"
                >
                  {t('loginView.form.resetPassword')}
                </Anchor>
              </Group>

              <Button type="submit" fullWidth className="mt-md">
                {t('loginView.form.submit')}
              </Button>
            </form>
          </div>
        )}
      </Transition>

      <Transition
        mounted={isPasswordResetFormOpened && !isResettingPassword}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
        exitDuration={0}
      >
        {styles => (
          <div style={styles}>
            <ResetPasswordForm
              setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
              handlePasswordReset={handlePasswordReset}
            />
          </div>
        )}
      </Transition>

      {isResettingPassword && (
        <Center h="100%">
          <Loader size="lg" name="loader" />
        </Center>
      )}

      <Transition
        mounted={isResetPasswordSent}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
      >
        {styles => (
          <div style={styles}>
            <ResetPasswordSuccessMessage />
          </div>
        )}
      </Transition>
    </Box>
  )
}
