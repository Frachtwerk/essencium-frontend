import {
  ResetPassword,
  SetPasswordInput,
  UserOutput,
} from '@frachtwerk/essencium-types'
import { showNotification } from '@mantine/notifications'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useTranslation } from 'next-i18next'

import { api } from './api'

type LoginCredentials = {
  username: string
  password: string
}

type TokenResponse = {
  token: string
}

export const authTokenAtom = atomWithStorage<string | null>('authToken', null)

export function useCreateToken(): UseMutationResult<
  TokenResponse,
  AxiosError,
  LoginCredentials
> {
  const setToken = useSetAtom(authTokenAtom)

  const mutation = useMutation<TokenResponse, AxiosError, LoginCredentials>({
    mutationKey: ['useCreateToken'],
    mutationFn: (loginCredentials: LoginCredentials) =>
      api
        .post<TokenResponse, LoginCredentials>(
          '/auth/token',
          loginCredentials,
          {
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          }
        )
        .then(response => response.data),
    onSuccess: (data: TokenResponse) => {
      setToken(data.token)
    },
  })

  return mutation
}

export function useInvalidateToken(): UseMutationResult<
  null,
  AxiosError,
  UserOutput['id'],
  unknown
> {
  const { t } = useTranslation()

  const mutation = useMutation<null, AxiosError, UserOutput['id']>({
    mutationKey: ['useInvalidateToken'],
    mutationFn: (userId: UserOutput['id']) =>
      api
        .post<null, null>(`/users/${userId}/terminate`, null)
        .then(response => response.data),
    onSuccess: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.invalidateUserSuccess.title'),
        message: t('notifications.invalidateUserSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },

    onError: () => {
      showNotification({
        autoClose: 4000,
        title: t('notifications.invalidateUserError.title'),
        message: t('notifications.invalidateUserError.message'),
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}

export function useRenewToken(): UseMutationResult<
  TokenResponse,
  AxiosError,
  void,
  unknown
> {
  const [token, setToken] = useAtom(authTokenAtom)

  const mutation = useMutation<TokenResponse, AxiosError>({
    mutationKey: ['useRenewToken'],
    mutationFn: () =>
      api
        .post<TokenResponse, null>('/auth/token', null)
        .then(res => res.data || token),
    onSuccess: (data: TokenResponse) => {
      setToken(data.token)
    },
  })

  return mutation
}

export function useResetPassword(): UseMutationResult<
  null,
  AxiosError,
  ResetPassword['email']
> {
  const mutation = useMutation<null, AxiosError, ResetPassword['email']>({
    mutationKey: ['useResetPassword'],
    mutationFn: (email: ResetPassword['email']) =>
      api
        .post<null, ResetPassword['email']>('/reset-credentials', email, {
          headers: { 'content-type': 'text/plain' },
        })
        .then(response => response.data),
  })

  return mutation
}

export function useSetPassword(): UseMutationResult<
  null,
  AxiosError,
  SetPasswordInput
> {
  const mutation = useMutation<null, AxiosError, SetPasswordInput>({
    mutationKey: ['useSetPassword'],
    mutationFn: ({ password, verification }: SetPasswordInput) =>
      api
        .post<null, SetPasswordInput>('/set-password', {
          password,
          verification,
        })
        .then(response => response.data),
  })

  return mutation
}
