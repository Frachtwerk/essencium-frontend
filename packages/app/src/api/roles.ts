import {
  PaginatedResponse,
  RoleInput,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'next-i18next'

import { authTokenAtom } from '@/api/auth'

import { api, VERSION } from './api'

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
  const { t } = useTranslation()

  const mutation = useMutation<RoleOutput, AxiosError, RoleInput>({
    mutationKey: ['useCreateRole'],
    mutationFn: (role: RoleInput) =>
      api
        .post<RoleOutput, RoleInput>(`${VERSION}/roles`, role)
        .then(response => response.data),
    onSuccess: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.createdDataSuccess.title'),
        message: t('notifications.createdDataSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.createdDataError.title'),
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onMutate: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.creatingAsyncData.title'),
        message: t('notifications.creatingAsyncData.message'),
        color: 'yellow',
        style: { position: 'fixed', top: '20px', right: '10px' },
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
        .get<RolesResponse>(`${VERSION}/roles`, {
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
  const { t } = useTranslation()

  const mutation = useMutation<RoleOutput, AxiosError, RoleUpdate>({
    mutationKey: ['useUpdateRole'],
    mutationFn: (role: RoleUpdate) =>
      api
        .put<RoleOutput, RoleUpdate>(`${VERSION}/roles/${role.id}`, role)
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
  })

  return mutation
}
