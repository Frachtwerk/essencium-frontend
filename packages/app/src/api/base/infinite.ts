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
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { parsePaginationParams } from '@/utils'

import { api } from '../api'
import { authTokenAtom } from '../auth'
import { FilterOptions, RequestOptions, TBaseFilter } from './types'

export interface UseGetInfiniteOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter>, RequestOptions {
  pagination?: Omit<PaginationParams, 'page'>
  infiniteOptions?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResponse<TOutput>,
      AxiosError<PaginatedResponse<TOutput>>
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'select'
  >
}

export type UseGetInfiniteResult<TOutput> = UseInfiniteQueryResult<
  InfiniteData<PaginatedResponse<TOutput>>,
  AxiosError<PaginatedResponse<TOutput>>
> & { items: TOutput[] }

export type UseGetInfinite<TOutput, TFilter extends TBaseFilter> = (
  options?: UseGetInfiniteOptions<TOutput, TFilter>,
) => UseGetInfiniteResult<TOutput>
export const createUseGetInfinite = <TOutput, TFilter extends TBaseFilter>(
  resource: string,
  options: UseGetInfiniteOptions<TOutput, TFilter> = {},
): UseGetInfinite<TOutput, TFilter> =>
  function useGetInfinite(getInfiniteOptions) {
    const {
      url = `/${resource}`,
      filter,
      pagination,
      requestConfig,
      infiniteOptions = {},
    } = {
      ...options,
      ...getInfiniteOptions,
    }

    const authToken = useAtomValue(authTokenAtom)

    const params = { ...parsePaginationParams(pagination), ...filter }

    const { enabled: settingsEnabled, ...restInfiniteOptions } = infiniteOptions

    const enabled = settingsEnabled
      ? settingsEnabled && Boolean(authToken)
      : Boolean(authToken)

    const query = useInfiniteQuery<
      PaginatedResponse<TOutput>,
      AxiosError<PaginatedResponse<TOutput>>
    >({
      queryKey: [resource, 'infinite', params],
      queryFn: ({ pageParam }) =>
        api
          .get<PaginatedResponse<TOutput>>(url, {
            ...requestConfig,
            params: {
              ...params,
              page: pageParam,
            },
          })
          .then(response => response.data),
      initialPageParam: 0,
      getNextPageParam(lastPage) {
        if (lastPage.number < lastPage.totalPages - 1) {
          return lastPage.number + 1
        }
        return undefined
      },
      enabled,
      ...restInfiniteOptions,
    })

    return {
      ...query,
      items: query.data?.pages.flatMap(page => page.content) ?? [],
    }
  }
