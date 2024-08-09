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
  PaginatedResponse,
  RoleInput,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import {
  QueryObserverOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { api } from './api'
import { authTokenAtom } from './auth'

export type RolesResponse = PaginatedResponse<RoleOutput>

export function useCreateRole(): UseMutationResult<
  RoleOutput,
  AxiosError,
  RoleInput
> {
  const mutation = useMutation<RoleOutput, AxiosError, RoleInput>({
    mutationKey: ['useCreateRole'],
    mutationFn: (role: RoleInput) =>
      api
        .post<RoleOutput, RoleInput>('/roles', role)
        .then(response => response.data),
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

export type UseGetRolesParams = {
  requestConfig?: {
    page: RolesResponse['number']
    size: RolesResponse['size']
    sort?: string
  }
  queryConfig?: QueryObserverOptions
}

export function useGetRoles({
  requestConfig,
  queryConfig,
}: UseGetRolesParams): UseQueryResult<RolesResponse, AxiosError> {
  const authToken = useAtomValue(authTokenAtom)

  const isDisabled = queryConfig?.enabled === false

  const { page, size, sort } = requestConfig || {}

  return useQuery<RolesResponse, AxiosError>({
    enabled: Boolean(authToken) && !isDisabled,
    queryKey: ['getRoles', { page, size, sort }],
    queryFn: () =>
      api
        .get<RolesResponse>('/roles', {
          params: {
            page,
            size,
            sort,
          },
        })
        .then(response => response.data),
  })
}

export function useUpdateRole(): UseMutationResult<
  RoleOutput,
  AxiosError,
  RoleUpdate
> {
  const mutation = useMutation<RoleOutput, AxiosError, RoleUpdate>({
    mutationKey: ['useUpdateRole'],
    mutationFn: (role: RoleUpdate) =>
      api
        .put<RoleOutput, RoleUpdate>(`/roles/${role.name}`, role)
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

export function useDeleteRole(): UseMutationResult<
  null,
  AxiosError,
  RoleOutput['name']
> {
  const mutation = useMutation<null, AxiosError, RoleOutput['name']>({
    mutationKey: ['useDeleteRole'],
    mutationFn: (roleId: RoleOutput['name']) =>
      api.delete<null>(`/roles/${roleId}`).then(response => response.data),
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
