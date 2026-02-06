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
import { UseInfiniteQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

import { parsePaginationParams } from '@/utils'

import { createUseGetInfinite, UseGetInfiniteResult } from './infinite'
import { FilterOptions, RequestOptions, TBaseFilter } from './types'

export interface UseGetAllOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter>, RequestOptions {
  pagination?: Pick<PaginationParams, 'sort'>
  infiniteOptions?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResponse<TOutput>,
      AxiosError<PaginatedResponse<TOutput>>
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'select'
  >
}

export type UseGetAllResult<TOutput> = UseGetInfiniteResult<TOutput>

export type UseGetAll<TOutput, TFilter extends TBaseFilter> = (
  options?: UseGetAllOptions<TOutput, TFilter>,
) => UseGetAllResult<TOutput>

export const createUseGetAll = <TOutput, TFilter extends TBaseFilter>(
  resource: string,
  options?: UseGetAllOptions<TOutput, TFilter>,
): UseGetAll<TOutput, TFilter> =>
  function useGetAll(getAllOptions) {
    const { pagination, ...mergedOptions } = { ...options, ...getAllOptions }

    const parsedPaginationParams = parsePaginationParams({
      ...pagination,
      size: 2000,
    })

    const query = createUseGetInfinite<TOutput, TFilter>(resource, {
      pagination: parsedPaginationParams,
      ...mergedOptions,
    })()

    useEffect(() => {
      if (!query.isLoading && query.hasNextPage) query.fetchNextPage()
    })

    return {
      ...query,
      items: query.data?.pages.flatMap(page => page.content) ?? [],
    }
  }
