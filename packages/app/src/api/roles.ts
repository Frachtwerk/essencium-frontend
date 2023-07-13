import { withBaseStylingShowNotification } from '@frachtwerk/essencium-lib'
import {
  PaginatedResponse,
  RoleInput,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { authTokenAtom } from '@/api/auth'

import { api } from './api'

export type RolesResponse = PaginatedResponse<RoleOutput>

export type GetRolesParams = {
  page: RolesResponse['number']
  size: RolesResponse['size']
  sort?: string
}

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
    onSuccess: () => {
      withBaseStylingShowNotification({
        notificationType: 'created',
        color: 'success',
      })
    },
    onError: () => {
      withBaseStylingShowNotification({
        notificationType: 'created',
        color: 'error',
      })
    },
  })

  return mutation
}

export function useGetRoles({
  page,
  size,
  sort,
}: GetRolesParams): UseQueryResult<RolesResponse, AxiosError> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<RolesResponse, AxiosError>({
    enabled: Boolean(authToken),
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
        .put<RoleOutput, RoleUpdate>(`/roles/${role.id}`, role)
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

export function useDeleteRole(): UseMutationResult<
  null,
  AxiosError,
  RoleOutput['id']
> {
  const mutation = useMutation<null, AxiosError, RoleOutput['id']>({
    mutationKey: ['useDeleteRole'],
    mutationFn: (roleId: RoleOutput['id']) =>
      api.delete<null>(`/roles/${roleId}`).then(response => response.data),
    onSuccess: () => {
      withBaseStylingShowNotification({
        notificationType: 'deleted',
        color: 'success',
      })
    },
    onError: () => {
      withBaseStylingShowNotification({
        notificationType: 'deleted',
        color: 'error',
      })
    },
  })

  return mutation
}
