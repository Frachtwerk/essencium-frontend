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
  PaginatedResponse,
  PaginationParams,
} from '@frachtwerk/essencium-types'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { parsePaginationParams } from '@/utils'

import { api } from '../api'
import { authTokenAtom } from '../auth'
import { FilterOptions, RequestOptions, TBaseFilter } from './types'

export interface UseGetPageOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter>,
    RequestOptions {
  pagination?: Partial<PaginationParams>
  queryOptions?: Omit<
    UseQueryOptions<
      PaginatedResponse<TOutput>,
      AxiosError<PaginatedResponse<TOutput>>
    >,
    'queryKey' | 'queryFn'
  >
}

export type UseGetPageResult<TOutput> = UseQueryResult<
  PaginatedResponse<TOutput>,
  AxiosError<PaginatedResponse<TOutput>>
>

export type UseGetPage<TOutput, TFilter extends TBaseFilter> = (
  options?: UseGetPageOptions<TOutput, TFilter>,
) => UseGetPageResult<TOutput>

export const createUseGetPage = <TOutput, TFilter extends TBaseFilter>(
  resource: string,
  options?: UseGetPageOptions<TOutput, TFilter>,
): UseGetPage<TOutput, TFilter> =>
  function useGetPage(getPageOptions) {
    const {
      url = `/${resource}`,
      pagination,
      filter,
      requestConfig,
      queryOptions = {},
    } = { ...options, ...getPageOptions }

    const authToken = useAtomValue(authTokenAtom)

    const params = { ...parsePaginationParams(pagination), ...filter }

    const { enabled: settingsEnabled, ...restQueryOptions } = queryOptions

    const enabled = settingsEnabled
      ? settingsEnabled && Boolean(authToken)
      : Boolean(authToken)

    return useQuery<
      PaginatedResponse<TOutput>,
      AxiosError<PaginatedResponse<TOutput>>
    >({
      queryKey: [resource, 'page', params],
      queryFn: () =>
        api
          .get<PaginatedResponse<TOutput>>(url, {
            ...requestConfig,
            params,
          })
          .then(response => response.data),
      enabled,
      ...restQueryOptions,
    })
  }
