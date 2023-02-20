import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import {
  LoginCredentials,
  SetPasswordRequest,
  TokenResponse,
} from '@/api/types/auth'

const VERSION = 'v1'

export function useGetToken(): ReturnType<typeof useQuery> {
  const credentials: LoginCredentials = {
    username: 'admin@frachtwerk.de',
    password: 'adminAdminAdmin',
  }

  const response = useQuery<TokenResponse>({
    queryKey: ['getToken'],
    queryFn: () => axios.post('/auth/token', credentials).then(res => res.data),
  })

  return response
}

export function useRenewToken(): ReturnType<typeof useQuery> {
  const response = useQuery<TokenResponse>({
    queryKey: ['renewToken'],
    queryFn: () => axios.post('/auth/renew').then(res => res.data),
  })

  return response
}

export function useResetPassword(
  username: string
): ReturnType<typeof useQuery> {
  const response = useQuery<void>({
    queryKey: ['resetPassword'],
    queryFn: () =>
      axios
        .post(
          `${VERSION}/reset-credentials`,
          { data: username },
          { headers: { 'content-type': 'text/plain' } }
        )
        .then(res => res.data),
  })

  return response
}

export function useSetPassword(
  request: SetPasswordRequest
): ReturnType<typeof useQuery> {
  const response = useQuery<void>({
    queryKey: ['setPassword'],
    queryFn: () =>
      axios
        .post(`${VERSION}/set-password`, {
          data: request,
        })
        .then(res => res.data),
  })

  return response
}
