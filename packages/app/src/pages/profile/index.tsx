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

import { LoadingSpinner, Profile } from '@frachtwerk/essencium-lib'
import { PasswordChange, UserUpdate } from '@frachtwerk/essencium-types'
import { Center } from '@mantine/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactElement } from 'react'

import { useGetMe, useGetRoles, useUpdateMe, useUpdatePassword } from '@/api'
import { AuthLayout } from '@/components/layouts'
import { getTranslation, logout } from '@/utils'
import { baseGetServerSideProps } from '@/utils/next'

function ProfileView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const { data: user, isLoading: isLoadingUser } = useGetMe()

  const { mutate: updateUser, isLoading: isUpdatingUser } = useUpdateMe()

  const { mutate: updatePassword, isLoading: isUpdatingPassword } =
    useUpdatePassword()

  const { data: rolesRequest } = useGetRoles({ page: 0, size: 9999 })

  const roles = rolesRequest?.content || []

  function handleUpdate(updatedUser: UserUpdate): void {
    updateUser(updatedUser)

    router.push('/profile', undefined, { locale: updatedUser.locale })
  }

  function handlePasswordUpdate(
    password: PasswordChange['password'],
    verification: PasswordChange['password'],
  ): void {
    updatePassword(
      { password, verification },
      {
        onSuccess: () => {
          logout()

          router.push('/login')
        },
      },
    )
  }

  if (user) {
    return (
      <Profile
        user={user}
        roles={roles}
        handleUpdate={handleUpdate}
        handlePasswordUpdate={handlePasswordUpdate}
        isUpdatingUser={isUpdatingUser}
        isUpdatingPassword={isUpdatingPassword}
      />
    )
  }

  if (isLoadingUser) {
    return <LoadingSpinner show />
  }

  return (
    <Center w="100%" h="100%">
      {t('profileView.userNotFound')}
    </Center>
  )
}

ProfileView.getLayout = function getLayout(
  page: ReactElement,
  version?: string,
) {
  return (
    <AuthLayout
      routeName={getTranslation('profileView.title')}
      version={version}
    >
      {page}
    </AuthLayout>
  )
}

export const getServerSideProps = baseGetServerSideProps()

export default ProfileView
