import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RoleInput, RoleOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type RolesResponse = PaginatedResponse<RoleOutput>

export function useGetRoles(): UseQueryResult<RolesResponse, AxiosError> {
  const query = useQuery<RolesResponse, AxiosError>({
    queryKey: ['getRoles'],
    queryFn: () =>
      api
        .get<RolesResponse>(`${VERSION}/roles`)
        .then(response => response.data),
  })

  return query
}

export function useUpdateRole(): UseMutationResult<
  RoleOutput,
  AxiosError,
  RoleInput
> {
  const mutation = useMutation<RoleOutput, AxiosError, RoleInput>({
    mutationKey: ['useUpdateRole'],
    mutationFn: (roleData: RoleInput) =>
      api
        .put<RoleOutput, RoleInput>(`${VERSION}/roles/${roleData.id}`, roleData)
        .then(res => res.data),
    onSuccess: () => {
      showNotification({
        autoClose: 2500,
        title: 'Successful Update',
        message: 'User rights have been updated',
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: 'We are sorry! Updating user rights was not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
