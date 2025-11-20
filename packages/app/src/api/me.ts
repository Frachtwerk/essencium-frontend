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
  PasswordChange,
  UserInput,
  UserOutput,
} from '@frachtwerk/essencium-types'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { api } from './api'
import { authTokenAtom } from './auth'

export function useGetMe(): UseQueryResult<UserOutput, unknown> {
  const authToken = useAtomValue(authTokenAtom)

  const query = useQuery({
    enabled: Boolean(authToken),
    queryKey: ['useGetMe'],
    queryFn: () =>
      api.get<UserOutput>('/users/me').then(response => response.data),
  })

  return query
}

export function useUpdateMe(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserInput
> {
  const mutation = useMutation<UserOutput, AxiosError, UserInput>({
    mutationKey: ['useUpdateMe'],
    mutationFn: (user: UserInput) =>
      api
        .put<UserOutput, UserInput>('/users/me', user)
        .then(response => response.data),
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
      successNotification: {
        notificationType: 'updated',
      },
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
          passwordData,
        )
        .then(response => response.data),
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
      successNotification: {
        notificationType: 'updated',
      },
    },
  })

  return mutation
}
