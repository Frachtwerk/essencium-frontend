import { Login, Login, LoginForm, LoginForm } from '@frachtwerk/lib'
import { ResetPassword } from '@frachtwerk/types'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { t } from 'i18next'
import { useState } from 'react'

import { useCreateToken, useResetPassword } from '@/api/auth'

export function LoginView(): JSX.Element {
  const navigate = useNavigate()

  const { mutate: resetPassword, isLoading: isResettingPassword } =
    useResetPassword()
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)
  const [isPasswordResetFormOpened, setIsPasswordResetFormOpened] =
    useState(false)

  const { mutate: createToken } = useCreateToken()

  function handleLogin(username: string, password: string): void {
    createToken(
      { username, password },
      {
        onSuccess: () => navigate({ to: '/' }),
        onError: (data: AxiosError) => {
          showNotification({
            autoClose: 4000,
            title: t('loginView.errorMessage.title'),
            message: data.message,
            color: 'red',
            style: { position: 'fixed', top: '20px', right: '10px' },
          })
        },
      }
    )
  }

  function handlePasswordReset(email: ResetPassword['email']): void {
    resetPassword(email, {
      onSuccess: () => {
        setIsResetPasswordSent(true)
        setIsPasswordResetFormOpened(false)
      },
      onError: (data: AxiosError) => {
        showNotification({
          autoClose: 4000,
          title: t('loginView.errorMessage.title'),
          message: data.message,
          color: 'red',
          style: { position: 'fixed', top: '20px', right: '10px' },
        })
      },
    })
  }

  return (
    <Login
      form={
        <LoginForm
          handleLogin={handleLogin}
          handlePasswordReset={handlePasswordReset}
          setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
          isResetPasswordSent={isResetPasswordSent}
          isPasswordResetFormOpened={isPasswordResetFormOpened}
          isResettingPassword={isResettingPassword}
        />
      }
    />
  )
}
