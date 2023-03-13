import { showNotification } from '@mantine/notifications'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { api } from '@/api'

type LoginCredentials = {
  username: string
  password: string
}

type TokenResponse = {
  token: string
}

type SetPasswordRequest = {
  password: string
  resetToken: string
}

const VERSION = 'v1'

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
        .post<TokenResponse, LoginCredentials>('/auth/token', loginCredentials)
        .then(res => res.data),
    onSuccess: (data: TokenResponse) => {
      setToken(data.token)
    },
    onError: (data: AxiosError) => {
      showNotification({
        autoClose: 4000,
        title: 'We are sorry! Your login was not successful.',
        message: data.message,
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}

/* export function useInvalidateToken(
  userId: number | undefined,
  enabled = true
): UseMutationResult<void, AxiosError, null, unknown> {
  const mutation = useMutation<void, AxiosError>({
    mutationKey: ['useInvalidateToken'],
    mutationFn: () =>
      api.post<void, null>(`/${VERSION}/users/${userId}/terminate`, null),
    enabled,
  })
  return mutation
} */

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

export function useResetPassword(
  username: string
): UseMutationResult<TokenResponse, AxiosError, void, unknown> {
  const mutation = useMutation<TokenResponse, AxiosError>({
    mutationKey: ['useResetPassword'],
    mutationFn: () =>
      api
        .post<TokenResponse, { data: string }>(
          `${VERSION}/reset-credentials`,
          {
            data: username,
          },
          { headers: { 'content-type': 'text/plain' } }
        )
        .then(res => res.data),
  })

  return mutation
}

export function useSetPassword(
  request: SetPasswordRequest
): UseMutationResult<TokenResponse, AxiosError, void, unknown> {
  const mutation = useMutation<TokenResponse, AxiosError>({
    mutationKey: ['useSetPassword'],
    mutationFn: () =>
      api
        .post<TokenResponse, { data: SetPasswordRequest }>(
          `${VERSION}/reset-credentials`,
          {
            data: request,
          }
        )
        .then(res => res.data),
  })

  return mutation
}
