import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
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

export type UseUpdateRoleData = {
  roleId: RoleOutput['id']
  role: RoleInput
}

export function useUpdateRole(): UseMutationResult<
  RoleOutput,
  AxiosError,
  UseUpdateRoleData
> {
  const { t } = useTranslation()

  const mutation = useMutation<RoleOutput, AxiosError, UseUpdateRoleData>({
    mutationKey: ['useUpdateRole'],
    mutationFn: ({ roleId, role }: UseUpdateRoleData) =>
      api
        .put<RoleOutput, RoleInput>(`${VERSION}/roles/${roleId}`, role)
        .then(response => response.data),
    onSuccess: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.updatedDataSuccess.title'),
        message: t('notifications.updatedDataSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.updatedDataError.title'),
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onMutate: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.updatingAsyncData.title'),
        message: t('notifications.updatingAsyncData.message'),
        color: 'yellow',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
