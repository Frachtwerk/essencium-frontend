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

import { ResetPassword } from '@frachtwerk/essencium-types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useCreateToken, useResetPassword } from '../api'
import { Login, LoginForm } from '../components/Login'
import { PublicLayout } from '../layouts'
import { getTranslation, withBaseStylingShowNotification } from '../utils'

export function LoginView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const searchParams = useSearchParams()

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
        onSuccess: () => router.push(searchParams.get('redirect') || '/'),
        onError: () => {
          withBaseStylingShowNotification({
            title: t('loginView.errorMessage.title'),
            color: 'error',
            notificationType: 'created',
          })
        },
      },
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
