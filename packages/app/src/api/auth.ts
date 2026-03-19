/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  ResetPassword,
  SetPasswordInput,
  UserOutput,
  UserSource,
} from '@frachtwerk/essencium-types'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { atom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { parseJwt } from '@/utils'

import { api } from './api'

function getAuthBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_USE_API_PROXY !== 'false') {
    return '/auth'
  }

  const apiUrl = process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION
    ? process.env.NEXT_PUBLIC_API_URL
    : window.runtimeConfig.required.API_URL

  return `${apiUrl}/auth`
}

type TokenResponse = {
  token: string
}

type LoginCredentials = {
  username: string
  password: string
}

type UserFromToken = {
  user: UserOutput
  rights: string[]
}

function getStringClaim(
  tokenPayload: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = tokenPayload[key]

  return typeof value === 'string' ? value : undefined
}

function getStringArrayClaim(
  tokenPayload: Record<string, unknown>,
  key: string,
): string[] {
  const value = tokenPayload[key]

  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((entry): entry is string => typeof entry === 'string')
}

export function getAuthStateFromToken(token: string): UserFromToken | null {
  const tokenPayload = parseJwt(token)

  if (!tokenPayload) {
    return null
  }

  const userId = tokenPayload.uid

  if (typeof userId !== 'string' && typeof userId !== 'number') {
    return null
  }

  const email = getStringClaim(tokenPayload, 'sub')
  const firstName =
    getStringClaim(tokenPayload, 'given_name') ??
    getStringClaim(tokenPayload, 'firstName')
  const lastName =
    getStringClaim(tokenPayload, 'family_name') ??
    getStringClaim(tokenPayload, 'lastName')

  if (!email || !firstName || !lastName) {
    return null
  }

  const rights = getStringArrayClaim(tokenPayload, 'rights')
  const roles = getStringArrayClaim(tokenPayload, 'roles')

  return {
    user: {
      id: userId,
      createdAt: undefined,
      createdBy: undefined,
      updatedAt: undefined,
      updatedBy: undefined,
      email,
      enabled: true,
      firstName,
      lastName,
      locale: getStringClaim(tokenPayload, 'locale') ?? 'en',
      mobile: getStringClaim(tokenPayload, 'mobile') ?? '',
      phone: getStringClaim(tokenPayload, 'phone') ?? '',
      source:
        getStringClaim(tokenPayload, 'source') ??
        getStringClaim(tokenPayload, 'userSource') ??
        UserSource.LOCAL,
      roles: roles.map(role => ({
        description: '',
        editable: false,
        name: role,
        protected: false,
        rights: rights.map(right => ({ authority: right, description: null })),
      })),
    },
    rights,
  }
}

export const authTokenAtom = atomWithStorage<string | null>('authToken', null)
export const userAtom = atomWithStorage<UserOutput | null>('user', null)
export const userRightsAtom = atomWithStorage<string[] | null>('rights', null)

export function useCreateToken(): UseMutationResult<
  TokenResponse,
  AxiosError,
  LoginCredentials
> {
  const t = useTranslations()
  const setAuthToken = useSetAtom(authTokenAtom)
  const setUser = useSetAtom(userAtom)
  const setUserRights = useSetAtom(userRightsAtom)

  const mutation = useMutation<TokenResponse, AxiosError, LoginCredentials>({
    mutationKey: ['useCreateToken'],
    mutationFn: (loginCredentials: LoginCredentials) =>
      api
        .post<TokenResponse, LoginCredentials>('/token', loginCredentials, {
          baseURL: getAuthBaseUrl(),
        })
        .then(response => response.data),
    onSuccess: data => {
      setAuthToken(data.token)

      localStorage.setItem('authToken', JSON.stringify(data.token))

      const userFromToken = getAuthStateFromToken(data.token)

      if (userFromToken) {
        setUser(userFromToken.user)
        setUserRights(userFromToken.rights)
      }
    },
    meta: {
      errorNotification: {
        title: t('loginView.errorMessage.title'),
        notificationType: 'created',
      },
    },
  })

  return mutation
}

export function useRenewToken(): UseMutationResult<
  TokenResponse,
  AxiosError,
  void
> {
  const setAuthToken = useSetAtom(authTokenAtom)

  // Token will be set in header automatically by the interceptor.
  return useMutation<TokenResponse, AxiosError, void>({
    mutationKey: ['useRenewToken'],
    mutationFn: async () => {
      const { data } = await api.post<TokenResponse, undefined>(
        '/renew',
        undefined,
        { baseURL: getAuthBaseUrl() },
      )
      return data
    },
    onSuccess: data => {
      setAuthToken(data.token)
      localStorage.setItem('authToken', JSON.stringify(data.token))
    },
  })
}

export function useInvalidateToken(): UseMutationResult<
  null,
  AxiosError,
  UserOutput['id'],
  unknown
> {
  const t = useTranslations()

  const mutation = useMutation<null, AxiosError, UserOutput['id']>({
    mutationKey: ['useInvalidateToken'],
    mutationFn: (userId: UserOutput['id']) =>
      api
        .post<null, null>(`/users/${userId}/terminate`, null)
        .then(response => response.data),
    meta: {
      errorNotification: {
        title: t('notifications.invalidateUserError.title'),
        message: t('notifications.invalidateUserError.message'),
        notificationType: 'updated',
      },
      successNotification: {
        title: t('notifications.invalidateUserSuccess.title'),
        message: t('notifications.invalidateUserSuccess.message'),
        notificationType: 'updated',
      },
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
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
    },
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
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
    },
  })

  return mutation
}

export const isSsoAtom = atom(get => get(userAtom)?.source !== UserSource.LOCAL)

export const ssoProviderAtom = atom(get => get(userAtom)?.source)

type SsoApplications = {
  [key: string]: {
    imageUrl: string
    name: string
    url: string
  }
}

export function useGetSsoApplications(): UseQueryResult<SsoApplications> {
  return useQuery({
    queryKey: ['useGetSsoApplications'],
    queryFn: () =>
      api
        .get<SsoApplications>('/oauth-registrations', {
          baseURL: getAuthBaseUrl(),
        })
        .then(response => response.data),
  })
}

export function useLogout(): UseMutationResult<void, AxiosError, void> {
  const router = useRouter()
  const resetAuthToken = useSetAtom(authTokenAtom)
  const resetUser = useSetAtom(userAtom)
  const resetUserRights = useSetAtom(userRightsAtom)

  return useMutation<void, AxiosError, void>({
    mutationKey: ['useLogout'],
    mutationFn: async () => {
      const appURL = process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION
        ? process.env.NEXT_PUBLIC_APP_URL
        : window.runtimeConfig.required.APP_URL

      const redirectUrl = `${appURL}/login`

      await api.post(
        `/logout?redirectUrl=${encodeURIComponent(redirectUrl)}`,
        undefined,
        { baseURL: getAuthBaseUrl() },
      )
    },
    onSettled: () => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('rights')

      resetAuthToken(null)
      resetUser(null)
      resetUserRights(null)

      router.push('/login')
    },
  })
}
