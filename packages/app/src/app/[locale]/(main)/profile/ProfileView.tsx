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

import { LoadingSpinner, Profile } from '@frachtwerk/essencium-lib'
import { PasswordChange, UserUpdate } from '@frachtwerk/essencium-types'
import { Center } from '@mantine/core'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { type JSX, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  isSsoAtom,
  useGetMe,
  userAtom,
  useUpdateMe,
  useUpdatePassword,
} from '@/api'
import { logout } from '@/utils'

export default function ProfileView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const isSso = useAtomValue(isSsoAtom)

  const { data: user, isLoading: isLoadingUser } = useGetMe()

  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
    data: updatedUserData,
  } = useUpdateMe()

  const setUser = useSetAtom(userAtom)

  useEffect(() => {
    if (updatedUserData) {
      setUser(updatedUserData)
    }
  }, [updatedUserData, setUser])

  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword()

  function handleUpdate(updatedUser: UserUpdate): void {
    updateUser(updatedUser)
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
        isSso={isSso}
        user={user}
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

  return <Center className="size-full">{t('profileView.userNotFound')}</Center>
}
