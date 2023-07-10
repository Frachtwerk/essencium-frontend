import {
  FilterObjectUser,
  PaginatedResponse,
  UserInput,
  UserOutput,
  UserUpdate,
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

import { api } from './api'

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
  userId: UserOutput['id']
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
  const { t } = useTranslation()

  const mutation = useMutation<UserInput, AxiosError, UserInput>({
    mutationKey: ['useCreateUser'],
    mutationFn: (newUser: UserInput) =>
      api.post<UserInput, UserInput>('/users', newUser).then(res => res.data),
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
  UserUpdate
> {
  const { t } = useTranslation()

  const mutation = useMutation<UserOutput, AxiosError, UserUpdate>({
    mutationKey: ['useUpdateUser'],
    mutationFn: (user: UserUpdate) =>
      api
        .put<UserOutput, UserUpdate>(`/users/${user.id}`, user)
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
  const { t } = useTranslation()

  const mutation = useMutation<null, AxiosError, UserOutput['id']>({
    mutationKey: ['useDeleteUser'],
    mutationFn: (userId: UserOutput['id']) =>
      api.delete<null>(`/users/${userId}`).then(response => response.data),
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
