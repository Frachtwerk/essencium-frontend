import {
  PasswordChange,
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
import { t } from 'i18next'
import { useAtom, useSetAtom, useStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { api } from './api'

const VERSION = 'v1'

export const userAtom = atomWithStorage<UserOutput | null>('user', null)

export function useGetMe(): UseQueryResult<UserOutput, unknown> {
  const store = useStore()

  const [, setUser] = useAtom(userAtom)

  const query = useQuery({
    queryKey: ['useGetMe'],
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

export function useUpdateMe(): UseMutationResult<
  UserOutput,
  AxiosError,
  UserUpdate
> {
  const setUser = useSetAtom(userAtom)

  const mutation = useMutation<UserOutput, AxiosError, UserUpdate>({
    mutationKey: ['useUpdateMe'],
    mutationFn: (user: UserUpdate) =>
      api
        .put<UserOutput, UserUpdate>(`${VERSION}/users/me`, user)
        .then(response => response.data),
    onSuccess: (updatedUser: UserOutput) => {
      setUser(updatedUser)

      showNotification({
        autoClose: 2500,
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
