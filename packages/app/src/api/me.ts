import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtom, useStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { ChangePassword, Password, UpdatedUserData, User } from 'lib'

import { api } from './api'

const VERSION = 'v1'

export const userAtom = atomWithStorage<User | null>('user', null)

export function useGetUser(): UseQueryResult<User, unknown> {
  const store = useStore()

  const [, setUser] = useAtom(userAtom)

  const query = useQuery({
    queryKey: ['getUser'],
    queryFn: () => api.get(`${VERSION}/users/me`).then(res => res.data),
    onSuccess(data: User) {
      setUser(data)
      store.set(userAtom, data)
    },
  })

  return query
}

export function useUpdateUser(): UseMutationResult<
  User,
  AxiosError,
  UpdatedUserData
> {
  const setUser = useSetAtom(userAtom)

  const mutation = useMutation<User, AxiosError, UpdatedUserData>({
    mutationKey: ['useUpdateToken'],
    mutationFn: (userData: UpdatedUserData) =>
      api
        .put<User, UpdatedUserData>(`${VERSION}/users/me`, userData)
        .then(res => res.data),
    onSuccess: (updatedUser: User) => {
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
  Password,
  AxiosError,
  ChangePassword
> {
  const mutation = useMutation<Password, AxiosError, ChangePassword>({
    mutationKey: ['useChangePassword'],
    mutationFn: (passwordData: ChangePassword) =>
      api
        .put<Password, ChangePassword>(
          `${VERSION}/users/me/password`,
          passwordData
        )
        .then(res => res.data),
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
