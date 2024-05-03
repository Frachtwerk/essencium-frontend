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
  PasswordInput,
  Text,
  TextInput,
  Transition,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../hooks'
import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'
import classes from './LoginForm.module.css'

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

  const { handleSubmit, control, formState } = useZodForm({
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
    <Box className={classes['login-form__box']}>
      <Transition
        mounted={!isPasswordResetFormOpened && !isResetPasswordSent}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
        exitDuration={0}
      >
        {styles => (
          <div style={styles}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder={String(t('loginView.form.emailPlaceholder'))}
                    label={t('loginView.form.email')}
                    required
                    classNames={{
                      label: classes['login-form__input-label'],
                    }}
                    withAsterisk
                  />
                )}
              />

              <Box className={classes['login-form__error-box']}>
                {formState.errors.email && (
                  <Text className={classes['login-form__error-text']}>
                    {formState.errors.email?.message
                      ? String(t(formState.errors.email.message))
                      : null}
                  </Text>
                )}
              </Box>

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    placeholder={String(
                      t('loginView.form.passwordPlaceholder'),
                    )}
                    label={t('loginView.form.password')}
                    required
                    classNames={{
                      label: classes['login-form__input-label'],
                      root: classes['login-form__input-margin'],
                    }}
                    withAsterisk
                  />
                )}
              />

              <Box className={classes['login-form__error-box']}>
                {formState.errors.password && (
                  <Text className={classes['login-form__error-text']}>
                    {formState.errors.password?.message
                      ? String(t(formState.errors.password.message))
                      : null}
                  </Text>
                )}
              </Box>

              <Group justify="apart" className={classes['login-form__group']}>
                <Anchor
                  size="xs"
                  fw="bold"
                  onClick={() => setIsPasswordResetFormOpened(true)}
                  role="link"
                >
                  {t('loginView.form.resetPassword')}
                </Anchor>
              </Group>

              <Button
                type="submit"
                fullWidth
                className={classes['login-form__button']}
              >
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
        <Center className={classes['login-form__center']}>
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
