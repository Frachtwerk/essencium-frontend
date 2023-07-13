import { withBaseStylingShowNotification } from '@frachtwerk/essencium-lib'
import {
  FilterObjectUser,
  PaginatedResponse,
  UserInput,
  UserOutput,
  UserUpdate,
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
  const mutation = useMutation<UserInput, AxiosError, UserInput>({
    mutationKey: ['useCreateUser'],
    mutationFn: (newUser: UserInput) =>
      api.post<UserInput, UserInput>('/users', newUser).then(res => res.data),
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

export function useUpdateUser(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserUpdate
> {
  const mutation = useMutation<UserOutput, AxiosError, UserUpdate>({
    mutationKey: ['useUpdateUser'],
    mutationFn: (user: UserUpdate) =>
      api
        .put<UserOutput, UserUpdate>(`/users/${user.id}`, user)
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

export function useDeleteUser(): UseMutationResult<
  null,
  AxiosError,
  UserOutput['id']
> {
  const mutation = useMutation<null, AxiosError, UserOutput['id']>({
    mutationKey: ['useDeleteUser'],
    mutationFn: (userId: UserOutput['id']) =>
      api.delete<null>(`/users/${userId}`).then(response => response.data),
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
