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

import { withBaseStylingShowNotification } from '@frachtwerk/essencium-lib'
import {
  PasswordChange,
  UserOutput,
  UserUpdate,
} from '@frachtwerk/essencium-types'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtom, useAtomValue, useSetAtom, useStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { authTokenAtom } from '@/api/auth'

import { api } from './api'

export const userAtom = atomWithStorage<UserOutput | null>('user', null)

export function useGetMe(): UseQueryResult<UserOutput, unknown> {
  const store = useStore()

  const [, setUser] = useAtom(userAtom)
  const authToken = useAtomValue(authTokenAtom)

  const query = useQuery({
    enabled: Boolean(authToken),
    queryKey: ['useGetMe'],
    queryFn: () =>
      api.get<UserOutput>('/users/me').then(response => response.data),
    onSuccess(data: UserOutput) {
      setUser(data)
      store.set(userAtom, data)
    },
  })

  return query
}

export function useUpdateMe(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserUpdate
> {
  const setUser = useSetAtom(userAtom)

  const mutation = useMutation<UserOutput, AxiosError, UserUpdate>({
    mutationKey: ['useUpdateMe'],
    mutationFn: (user: UserUpdate) =>
      api
        .put<UserOutput, UserUpdate>('/users/me', user)
        .then(response => response.data),
    onSuccess: (updatedUser: UserOutput) => {
      setUser(updatedUser)

      withBaseStylingShowNotification({
        notificationType: 'updated',
        color: 'success',
      })
    },
    onError: () => {
      withBaseStylingShowNotification({
        notificationType: 'updated',
        color: 'error',
      })
    },
  })

  return mutation
}

export function useUpdatePassword(): UseMutationResult<
  UserOutput,
  AxiosError,
  Omit<PasswordChange, 'confirmPassword'>
> {
  const mutation = useMutation<
    UserOutput,
    AxiosError,
    Omit<PasswordChange, 'confirmPassword'>
  >({
    mutationKey: ['useChangePassword'],
    mutationFn: (passwordData: Omit<PasswordChange, 'confirmPassword'>) =>
      api
        .put<UserOutput, Omit<PasswordChange, 'confirmPassword'>>(
          '/users/me/password',
          passwordData
        )
        .then(response => response.data),
    onSuccess: () => {
      withBaseStylingShowNotification({
        notificationType: 'updated',
        color: 'success',
      })
    },
    onError: () => {
      withBaseStylingShowNotification({
        notificationType: 'updated',
        color: 'error',
      })
    },
  })

  return mutation
}
