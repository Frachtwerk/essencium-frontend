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
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useTranslation } from 'react-i18next'

import { api } from './api'

type TokenResponse = {
  token: string
}

type LoginCredentials = {
  username: string
  password: string
}

export const authTokenAtom = atomWithStorage<string | null>('authToken', null)

export const userAtom = atomWithStorage<UserOutput | null>('user', null)

export const userRightsAtom = atomWithStorage<string[] | null>('rights', null)

export function useCreateToken(): UseMutationResult<
  TokenResponse,
  AxiosError,
  LoginCredentials
> {
  const { t } = useTranslation()

  const mutation = useMutation<TokenResponse, AxiosError, LoginCredentials>({
    mutationKey: ['useCreateToken'],
    mutationFn: (loginCredentials: LoginCredentials) =>
      api
        .post<TokenResponse, LoginCredentials>('/token', loginCredentials, {
          baseURL: `${
            process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION
              ? process.env.NEXT_PUBLIC_API_URL
              : window.runtimeConfig.required.API_URL
          }/auth`,
        })
        .then(response => response.data),
    meta: {
      errorNotification: {
        title: t('loginView.errorMessage.title'),
        notificationType: 'created',
      },
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
          baseURL: `${
            process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION
              ? process.env.NEXT_PUBLIC_API_URL
              : window.runtimeConfig.required.API_URL
          }/auth`,
        })
        .then(response => response.data),
  })
}
