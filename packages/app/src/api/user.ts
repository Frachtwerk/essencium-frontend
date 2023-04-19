import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserInput, UserOutput } from 'types'
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
    onSuccess: (newUser: UserInput) => {
      showNotification({
        autoClose: 4000,
        title: `Successfully added ${newUser.firstName} ${newUser.lastName}`,
        message: 'You added a new user',
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: 'We are sorry! Adding a new user was not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}

// workaround before refactoring Input/Output logic of API --> #263
export type UseUpdateUserData = {
  userId: UserOutput['id']
  user: UserInput & { id: UserOutput['id'] }
}

export function useUpdateUser(): UseMutationResult<
  UserOutput,
  AxiosError,
  UseUpdateUserData
> {
  const mutation = useMutation<UserOutput, AxiosError, UseUpdateUserData>({
    mutationKey: ['useUpdateUser'],
    mutationFn: ({ userId, user }: UseUpdateUserData) =>
      api
        .put<UserOutput, UseUpdateUserData['user']>(
          `${VERSION}/users/${userId}`,
          // workaround before refactoring Input/Output logic of API --> #263
          {
            ...user,
            id: userId,
          }
        )
        .then(response => response.data),
    onSuccess: (user: UserOutput) => {
      showNotification({
        autoClose: 4000,
        title: `Successfully updated ${user.firstName} ${user.lastName}`,
        message: 'You updated a user',
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: 'We are sorry! Updating a user was not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
