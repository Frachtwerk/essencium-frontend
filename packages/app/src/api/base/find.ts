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
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { api } from '../api'
import { authTokenAtom } from '../auth'
import { RequestOptions } from './types'

export interface UseFindOptions<TOutput> extends RequestOptions {
  queryOptions?: Omit<
    UseQueryOptions<TOutput, AxiosError<TOutput>>,
    'queryKey' | 'queryFn'
  >
}

export type UseFindResult<TOutput> = UseQueryResult<
  TOutput,
  AxiosError<TOutput>
>

export type UseFind<TOutput> = (
  id: string | number | undefined,
  options?: UseFindOptions<TOutput>,
) => UseFindResult<TOutput>

export const createUseFind = <TOutput>(
  resource: string,
  options: UseFindOptions<TOutput> = {},
): UseFind<TOutput> =>
  function useFind(id, useFindOptions) {
    const {
      url = `/${resource}/${id}`,
      requestConfig,
      queryOptions = {},
    } = { ...options, ...useFindOptions }

    const authToken = useAtomValue(authTokenAtom)

    const { enabled: settingsEnabled, ...restQueryOptions } = queryOptions

    const enabled = settingsEnabled
      ? settingsEnabled && Boolean(authToken) && Boolean(id)
      : Boolean(authToken) && Boolean(id)

    return useQuery<TOutput, AxiosError<TOutput>>({
      queryKey: [resource, 'find', id],
      queryFn: () =>
        api.get<TOutput>(url, requestConfig).then(response => response.data),
      enabled,
      ...restQueryOptions,
    })
  }
