import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtom, useSetAtom, useStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { PasswordChange, UserInput, UserOutput } from 'types'

import { api } from './api'

const VERSION = 'v1'

export const userAtom = atomWithStorage<UserOutput | null>('user', null)

export function useGetUser(): UseQueryResult<UserOutput, unknown> {
  const store = useStore()

  const [, setUser] = useAtom(userAtom)

  const query = useQuery({
    queryKey: ['getUser'],
    queryFn: () =>
      api
        .get<UserOutput>(`${VERSION}/users/me`)
        .then(response => response.data),
    onSuccess(data: UserOutput) {
      setUser(data)
      store.set(userAtom, data)
    },
  })

  return query
}

export function useUpdateUser(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserInput
> {
  const setUser = useSetAtom(userAtom)

  const mutation = useMutation<UserOutput, AxiosError, UserInput>({
    mutationKey: ['useUpdateToken'],
    mutationFn: (userData: UserInput) =>
      api
        .put<UserOutput, UserInput>(`${VERSION}/users/me`, userData)
        .then(res => res.data),
    onSuccess: (updatedUser: UserOutput) => {
      setUser(updatedUser)
      showNotification({
        autoClose: 2500,
        title: 'Successful Update',
        message: 'Your personal data has been updated',
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: 'We are sorry! Updating your data was not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}

export function useUpdatePassword(): UseMutationResult<
  UserOutput,
  AxiosError,
  Omit<PasswordChange, 'confirmPassword'>
> {
  const mutation = useMutation<
    UserOutput,
    AxiosError,
    Omit<PasswordChange, 'confirmPassword'>
  >({
    mutationKey: ['useChangePassword'],
    mutationFn: (passwordData: Omit<PasswordChange, 'confirmPassword'>) =>
      api
        .put<UserOutput, Omit<PasswordChange, 'confirmPassword'>>(
          `${VERSION}/users/me/password`,
          passwordData
        )
        .then(response => response.data),
    onSuccess: () => {
      showNotification({
        autoClose: 2500,
        title: 'Successful Update',
        message: 'Your passworrd has been updated',
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: 'We are sorry! Updating your password was not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
