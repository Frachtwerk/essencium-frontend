import { showNotification } from '@mantine/notifications'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { t } from 'i18next'
import { Login, LoginForm } from 'lib'
import { useState } from 'react'
import { ResetPassword } from 'types'

import { useCreateToken, useResetPassword } from '@/api/auth'

export function LoginView(): JSX.Element {
  const navigate = useNavigate()

  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)
  const [isPasswordResetFormOpened, setIsPasswordResetFormOpened] =
    useState(false)

  const { mutate } = useCreateToken()
  const { mutate: handleReset } = useResetPassword()

  function handleLogin(username: string, password: string): void {
    mutate(
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
    handleReset(email, {
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
        />
      }
    />
  )
}
