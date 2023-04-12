import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { NewUserInput, UserInput, UserOutput } from 'types'
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

export function useAddUser(): UseMutationResult<
  UserInput,
  AxiosError,
  NewUserInput
> {
  const mutation = useMutation<UserInput, AxiosError, NewUserInput>({
    mutationKey: ['useAddUser'],
    mutationFn: (newUser: NewUserInput) =>
      api
        .post<UserInput, NewUserInput>(`${VERSION}/users`, newUser)
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
        title: 'We are sorry! Adding a new user not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
