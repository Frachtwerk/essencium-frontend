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
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from './api'
import {
  createUseCreate,
  createUseDelete,
  createUseGetAll,
  createUseGetPage,
} from './base'

export type RolesResponse = PaginatedResponse<RoleOutput>

const RESOURCE = 'roles'

export const useGetAllRoles = createUseGetAll<
  RoleOutput,
  Record<string, never>
>(RESOURCE)

export const useCreateRole = createUseCreate<RoleOutput, RoleInput>(RESOURCE)

export const useGetRoles = createUseGetPage<RoleOutput, Record<string, never>>(
  RESOURCE,
)

// Not implemented with useUpdate because roles are identified by their name instead of an id
export function useUpdateRole(): UseMutationResult<
  RoleOutput,
  AxiosError,
  RoleUpdate
> {
  const queryClient = useQueryClient()

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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['roles', 'all'] }),
  })

  return mutation
}

export const useDeleteRole = createUseDelete(RESOURCE)
