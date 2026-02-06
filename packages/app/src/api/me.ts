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
  PasswordChange,
  UserOutput,
  UserUpdate,
} from '@frachtwerk/essencium-types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { api } from './api'
import { authTokenAtom } from './auth'
import { createUseUpdate } from './base'

const RESOURCE = '/users/me'

export function useGetMe(): UseQueryResult<UserOutput, AxiosError<UserOutput>> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<UserOutput, AxiosError<UserOutput>>({
    queryKey: [RESOURCE],
    queryFn: () => api.get<UserOutput>(RESOURCE).then(res => res.data),
    enabled: !!authToken,
  })
}

export const useUpdateMe = createUseUpdate<UserOutput, UserUpdate>(RESOURCE, {
  url: RESOURCE,
  invalidateQueryKeys: [[RESOURCE]],
})

// `createUseUpdate` expects a payload type that includes an `id` property.
// For the `/users/me/password` endpoint, the backend determines the user from
// the authenticated session and the fixed URL (`/users/me/password`), so no
// `id` is actually required or used in the request body. We therefore extend
// `PasswordChange` with an optional `id` that is always `undefined` purely to
// satisfy this generic constraint; the request URL is explicitly set to
// `${RESOURCE}/password`, so the `id` field is ignored by the API.
export const useUpdatePassword = createUseUpdate<
  UserOutput,
  Omit<PasswordChange & { id?: undefined }, 'confirmPassword'>
>(`${RESOURCE}/password`, {
  url: `${RESOURCE}/password`,
  invalidateQueryKeys: [[RESOURCE]],
})
