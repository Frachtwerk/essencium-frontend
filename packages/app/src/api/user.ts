import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { t } from 'i18next'
import { UserInput, UserOutput, UserUpate } from 'types'
import { PaginatedResponse } from 'types/src/base'

import { api } from './api'

const VERSION = 'v1'

export type UsersResponse = PaginatedResponse<UserOutput>

export type GetUsersParams = {
  page: UsersResponse['number']
  size: UsersResponse['size']
}

export function useGetUsers({
  page,
  size,
}: GetUsersParams): UseQueryResult<UsersResponse, AxiosError> {
  const query = useQuery<UsersResponse, AxiosError>({
    queryKey: ['getUsers', { page, size }],
    queryFn: () =>
      api
        .get<UsersResponse>(`${VERSION}/users`, {
          params: {
            page,
            size,
          },
        })
        .then(response => response.data),
  })

  return query
}

export function useGetUser(
  userId: UserOutput['id']
): UseQueryResult<UserOutput, AxiosError> {
  const query = useQuery<UserOutput, AxiosError>({
    queryKey: ['useGetUser', userId],
    queryFn: () =>
      api
        .get<UserOutput>(`${VERSION}/users/${userId}`)
        .then(response => response.data),
  })

  return query
}

export function useCreateUser(): UseMutationResult<
  UserInput,
  AxiosError,
  UserInput
> {
  const mutation = useMutation<UserInput, AxiosError, UserInput>({
    mutationKey: ['useCreateUser'],
    mutationFn: (newUser: UserInput) =>
      api
        .post<UserInput, UserInput>(`${VERSION}/users`, newUser)
        .then(res => res.data),
    onSuccess: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.createdDataSuccess.title'),
        message: t('notifications.createdDataSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.createdDataError.title'),
        message: t('notifications.createdDataError.message'),
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}

export function useUpdateUser(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserUpate
> {
  const mutation = useMutation<UserOutput, AxiosError, UserUpate>({
    mutationKey: ['useUpdateUser'],
    mutationFn: (user: UserUpate) =>
      api
        .put<UserOutput, UserUpate>(`${VERSION}/users/${user.id}`, user)
        .then(response => response.data),
    onSuccess: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.updatedDataSuccess.title'),
        message: t('notifications.updatedDataSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.updatedDataError.title'),
        message: t('notifications.updatedDataError.message'),
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
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
      api
        .delete<null>(`${VERSION}/users/${userId}`)
        .then(response => response.data),
    onSuccess: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.deletedDataSuccess.title'),
        message: t('notifications.deletedDataSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.deletedDataError.title'),
        message: t('notifications.deletedDataError.message'),
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
