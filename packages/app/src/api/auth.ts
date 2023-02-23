import { useMutation, UseMutationResult } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAtom, useStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import {
  LoginCredentials,
  SetPasswordRequest,
  TokenResponse,
} from '@/api/types/auth'

const VERSION = 'v1'
const tokenAtom = atomWithStorage<string | null>('authToken', null)

export function useCreateToken(
  username: string,
  password: string
): UseMutationResult<TokenResponse, AxiosError, void, unknown> {
  const store = useStore()
  const [token, setToken] = useAtom(tokenAtom)

  const credentials: LoginCredentials = {
    username,
    password,
  }

  const mutation = useMutation<TokenResponse, AxiosError>({
    mutationKey: ['createToken'],
    mutationFn: () =>
      axios.post('/auth/token', credentials).then(res => res.data || token),
    onSuccess(data: TokenResponse) {
      setToken(data.token)
      store.set(tokenAtom, data.token)
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
  const store = useStore()
  const [token, setToken] = useAtom(tokenAtom)

  const mutation = useMutation<TokenResponse, AxiosError>({
    mutationKey: ['renewToken'],
    mutationFn: () => axios.post('/auth/token').then(res => res.data || token),
    onSuccess(data: TokenResponse) {
      setToken(data.token)
      store.set(tokenAtom, data.token)
    },
  })

  return mutation
}

export function useResetPassword(
  username: string
): UseMutationResult<TokenResponse, AxiosError, void, unknown> {
  const mutation = useMutation<TokenResponse, AxiosError>({
    mutationKey: ['resetPassword'],
    mutationFn: () =>
      axios
        .post(
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
    mutationKey: ['setPassword'],
    mutationFn: () =>
      axios
        .post(`${VERSION}/reset-credentials`, {
          data: request,
        })
        .then(res => res.data),
  })

  return mutation
}
