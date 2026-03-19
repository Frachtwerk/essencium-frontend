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

function getStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === 'string')
    : []
}

export function getAuthStateFromToken(token: string): UserFromToken | null {
  const payload = parseJwt(token)
  if (!payload) return null

  // Validate required fields with proper type checking
  if (
    (typeof payload.uid !== 'string' && typeof payload.uid !== 'number') ||
    typeof payload.sub !== 'string'
  ) {
    return null
  }

  const firstName = payload.given_name || payload.firstName
  const lastName = payload.family_name || payload.lastName

  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    return null
  }

  const rights = getStringArray(payload.rights)
  const roles = getStringArray(payload.roles)
  const locale = typeof payload.locale === 'string' ? payload.locale : 'en'
  const mobile = typeof payload.mobile === 'string' ? payload.mobile : ''
  const phone = typeof payload.phone === 'string' ? payload.phone : ''
  const source =
    typeof payload.source === 'string'
      ? payload.source
      : typeof payload.userSource === 'string'
        ? payload.userSource
        : UserSource.LOCAL

  return {
    user: {
      id: payload.uid,
      email: payload.sub,
      firstName,
      lastName,
      enabled: true,
      locale,
      mobile,
      phone,
      source,
      roles: roles.map(name => ({
        name,
        description: '',
        editable: false,
        protected: false,
        rights: rights.map(authority => ({ authority, description: null })),
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
      resetAuthToken(null)
      resetUser(null)
      resetUserRights(null)
      router.push('/login')
    },
  })
}
