import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { User } from 'lib'

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
        .then(response => response.data),
    onSuccess: (data: TokenResponse) => {
      setToken(data.token)
    },
  })

  return mutation
}

export function useInvalidateToken(
  userId: User['id']
): UseMutationResult<null, AxiosError, null, unknown> {
  const mutation = useMutation<null, AxiosError, null>({
    mutationKey: ['useInvalidateToken'],
    mutationFn: () =>
      api
        .post<null, null>(`/${VERSION}/users/${userId}/terminate`, null)
        .then(response => response.data),
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
