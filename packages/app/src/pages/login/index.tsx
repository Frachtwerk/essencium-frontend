import {
  getTranslation,
  Login,
  LoginForm,
  withBaseStylingShowNotification,
} from '@frachtwerk/essencium-lib'
import { ResetPassword } from '@frachtwerk/essencium-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useCreateToken, useResetPassword } from '@/api/auth'
import PublicLayout from '@/components/layouts/PublicLayout'
import { baseGetStaticProps } from '@/utils/next'

function LoginView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

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
        onSuccess: () => router.push('/'),
        onError: () => {
          withBaseStylingShowNotification({
            title: t('loginView.errorMessage.title'),
            color: 'error',
            notificationType: 'created',
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

LoginView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return (
    <PublicLayout routeName={getTranslation('loginView.title')}>
      {page}
    </PublicLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default LoginView
