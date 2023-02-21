import { useMutation, UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'
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
): UseMutationResult<TokenResponse, unknown, void, unknown> {
  const store = useStore()
  const [token, setToken] = useAtom(tokenAtom)

  const credentials: LoginCredentials = {
    username,
    password,
  }

  const mutation = useMutation<TokenResponse>({
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
  unknown,
  void,
  unknown
> {
  const [token, setToken] = useAtom(tokenAtom)

  const mutation = useMutation<TokenResponse>({
    mutationKey: ['renewToken'],
    mutationFn: () => axios.post('/auth/token').then(res => res.data || token),
    onSuccess(data: TokenResponse) {
      setToken(data.token)
    },
  })

  return mutation
}

export function useResetPassword(
  username: string
): UseMutationResult<TokenResponse, unknown, void, unknown> {
  const mutation = useMutation<TokenResponse>({
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
): UseMutationResult<TokenResponse, unknown, void, unknown> {
  const mutation = useMutation<TokenResponse>({
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
