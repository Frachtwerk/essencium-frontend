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
  ApiTokenInput,
  ApiTokenOutput,
  BasicRepresentation,
  FilterObjectApiToken,
} from '@frachtwerk/essencium-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { api } from './api'
import { authTokenAtom } from './auth'
import {
  createUseCreate,
  createUseDelete,
  createUseFind,
  createUseGetPage,
} from './base'

const RESOURCE = 'api-tokens'

export const {
  useGetPage: useGetApiTokens,
  useFind: useGetApiToken,
  useCreate: useCreateApiToken,
  useDelete: useDeleteApiToken,
} = {
  useGetPage: createUseGetPage<ApiTokenOutput, FilterObjectApiToken>(RESOURCE),
  useFind: createUseFind<ApiTokenOutput>(RESOURCE),
  useCreate: createUseCreate<ApiTokenOutput, ApiTokenInput>(RESOURCE, {
    invalidateQueryKeys: [[RESOURCE]],
  }),
  useDelete: createUseDelete<void, string>(RESOURCE, {
    invalidateQueryKeys: [[RESOURCE]],
  }),
}

export function useRevokeApiToken(): ReturnType<
  typeof useMutation<ApiTokenOutput, AxiosError<ApiTokenOutput>, string>
> {
  const queryClient = useQueryClient()

  return useMutation<ApiTokenOutput, AxiosError<ApiTokenOutput>, string>({
    mutationKey: [RESOURCE, 'revoke'],
    mutationFn: (id: string) =>
      api
        .patch<
          ApiTokenOutput,
          { status: 'REVOKED' }
        >(`/${RESOURCE}/${id}`, { status: 'REVOKED' })
        .then(res => res.data),
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
      successNotification: {
        notificationType: 'updated',
      },
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCE] })
    },
  })
}

export function useGetAllApiTokens(): ReturnType<
  typeof useQuery<
    Record<string, ApiTokenOutput[]>,
    AxiosError<Record<string, ApiTokenOutput[]>>
  >
> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<
    Record<string, ApiTokenOutput[]>,
    AxiosError<Record<string, ApiTokenOutput[]>>
  >({
    queryKey: [RESOURCE, 'all'],
    queryFn: () =>
      api
        .get<Record<string, ApiTokenOutput[]>>(`/${RESOURCE}/all`)
        .then(res => res.data),
    enabled: Boolean(authToken),
  })
}

export function useGetAllApiTokensGrouped(): ReturnType<
  typeof useQuery<
    Array<{ user: BasicRepresentation; tokens: ApiTokenOutput[] }>,
    AxiosError
  >
> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<
    Array<{ user: BasicRepresentation; tokens: ApiTokenOutput[] }>,
    AxiosError
  >({
    queryKey: [RESOURCE, 'all-grouped'],
    queryFn: () =>
      api
        .get<Record<string, ApiTokenOutput[]>>(`/${RESOURCE}/all`)
        .then(res => {
          const allTokens = Object.values(res.data).flat()

          const grouped = new Map<string, ApiTokenOutput[]>()

          for (const token of allTokens) {
            const key = String(token.linkedUser.id)
            const existing = grouped.get(key)
            if (existing) {
              existing.push(token)
            } else {
              grouped.set(key, [token])
            }
          }

          return Array.from(grouped.entries()).map(([, tokens]) => ({
            user: tokens[0].linkedUser,
            tokens,
          }))
        }),
    enabled: Boolean(authToken),
  })
}

export function useGetTokenExpirationInfo(): ReturnType<
  typeof useQuery<number, AxiosError<number>>
> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<number, AxiosError<number>>({
    queryKey: [RESOURCE, 'token-expiration-info'],
    queryFn: () =>
      api
        .get<number>(`/${RESOURCE}/token-expiration-info`)
        .then(res => res.data),
    enabled: Boolean(authToken),
  })
}
