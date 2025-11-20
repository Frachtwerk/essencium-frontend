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
  FilterObjectUser,
  PaginatedResponse,
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

export type UsersResponse = PaginatedResponse<UserOutput>

export type GetUsersParams = {
  page: UsersResponse['number']
  size: UsersResponse['size']
  sort?: string
  filter?: FilterObjectUser
}

export function useGetUsers({
  page,
  size,
  sort,
  filter,
}: GetUsersParams): UseQueryResult<UsersResponse, AxiosError> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<UsersResponse, AxiosError>({
    enabled: Boolean(authToken),
    queryKey: ['getUsers', { page, size, sort, filter }],
    queryFn: () =>
      api
        .get<UsersResponse>('/users', {
          params: {
            page,
            size,
            sort,
            ...filter,
          },
        })
        .then(response => response.data),
  })
}

export function useGetUser(
  userId: UserOutput['id'],
): UseQueryResult<UserOutput, AxiosError> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<UserOutput, AxiosError>({
    enabled: Boolean(authToken) && Boolean(userId),
    queryKey: ['useGetUser', userId],
    queryFn: () =>
      api.get<UserOutput>(`/users/${userId}`).then(response => response.data),
  })
}

export function useCreateUser(): UseMutationResult<
  UserInput,
  AxiosError,
  UserInput
> {
  const mutation = useMutation<UserInput, AxiosError, UserInput>({
    mutationKey: ['useCreateUser'],
    mutationFn: (newUser: UserInput) =>
      api.post<UserInput, UserInput>('/users', newUser).then(res => res.data),
    meta: {
      errorNotification: {
        notificationType: 'created',
      },
      successNotification: {
        notificationType: 'created',
      },
    },
  })

  return mutation
}

export function useUpdateUser(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserInput
> {
  const mutation = useMutation<UserOutput, AxiosError, UserInput>({
    mutationKey: ['useUpdateUser'],
    mutationFn: (user: UserInput) =>
      api
        .put<UserOutput, UserInput>(`/users/${user.id}`, user)
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

export function useDeleteUser(): UseMutationResult<
  null,
  AxiosError,
  UserOutput['id']
> {
  const mutation = useMutation<null, AxiosError, UserOutput['id']>({
    mutationKey: ['useDeleteUser'],
    mutationFn: (userId: UserOutput['id']) =>
      api.delete<null>(`/users/${userId}`).then(response => response.data),
    meta: {
      errorNotification: {
        notificationType: 'deleted',
      },
      successNotification: {
        notificationType: 'deleted',
      },
    },
  })

  return mutation
}
