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
  BaseProperties,
  PaginatedResponse,
  PaginationParams,
} from '@frachtwerk/essencium-types'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

import { parsePaginationParams } from '@/utils/pagination'

import { api } from './api'
import { authTokenAtom } from './auth'

type Filter = Record<string, unknown>

interface UseQueryOptions {
  settings?: {
    enabled?: boolean
  }
}

interface UseMutationOptions {
  invalidateQueryKeys?: Array<string | string[]>
  meta?: Record<string, unknown>
}

interface FilterOptions<F extends Filter> {
  filter?: F
}

interface PaginationOptions {
  pagination?: Partial<PaginationParams>
}

export interface UseGetInfiniteOptions<F extends Filter>
  extends UseQueryOptions,
    FilterOptions<F> {
  pagination?: Omit<PaginationParams, 'page'>
}

export type UseGetInfiniteResult<O> = UseInfiniteQueryResult<
  InfiniteData<PaginatedResponse<O>>,
  AxiosError
> & { items: O[] }

export function useGetInfinite<O, F extends Filter>(
  resource: string,
  options: UseGetInfiniteOptions<F> = {},
): UseGetInfiniteResult<O> {
  const { settings, pagination, filter } = options

  const authToken = useAtomValue(authTokenAtom)

  const parsedPaginationParams = parsePaginationParams(pagination)

  const query = useInfiniteQuery<PaginatedResponse<O>, AxiosError>({
    queryKey: [resource, 'infinite', filter, parsedPaginationParams],
    queryFn: ({ pageParam }) =>
      api
        .get<PaginatedResponse<O>>(`/${resource}`, {
          params: {
            ...parsedPaginationParams,
            page: pageParam,
            ...filter,
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
    enabled:
      settings?.enabled !== undefined
        ? settings.enabled && Boolean(authToken)
        : Boolean(authToken),
  })

  return {
    ...query,
    items: query.data?.pages.flatMap(page => page.content) ?? [],
  }
}

export interface UseGetAllOptions<F extends Filter>
  extends UseQueryOptions,
    FilterOptions<F> {
  pagination?: Pick<PaginationParams, 'sort'>
}

export type UseGetAllResult<O> = UseGetInfiniteResult<O>

export function useGetAll<O, F extends Filter>(
  resource: string,
  options: UseGetAllOptions<F> = {},
): UseGetAllResult<O> {
  const { settings, pagination, filter } = options

  const parsedPaginationParams = parsePaginationParams({
    ...pagination,
    size: 2000,
  })

  const query = useGetInfinite<O, F>(resource, {
    settings,
    pagination: parsedPaginationParams,
    filter,
  })

  useEffect(() => {
    if (!query.isLoading && query.hasNextPage) query.fetchNextPage()
  })

  return {
    ...query,
    items: query.data?.pages.flatMap(page => page.content) ?? [],
  }
}

export interface UseGetPageOptions<F extends Filter>
  extends UseQueryOptions,
    FilterOptions<F>,
    PaginationOptions {}

export type UseGetPageResult<O> = UseQueryResult<
  PaginatedResponse<O>,
  AxiosError
>

export function useGetPage<O, F extends Filter>(
  resource: string,
  options: UseGetPageOptions<F> = {},
): UseGetPageResult<O> {
  const { settings, pagination, filter } = options

  const authToken = useAtomValue(authTokenAtom)

  const parsedPaginationParams = parsePaginationParams(pagination)

  return useQuery<PaginatedResponse<O>, AxiosError<PaginatedResponse<O>>>({
    queryKey: [resource, 'all', filter, parsedPaginationParams],
    queryFn: () =>
      api
        .get<PaginatedResponse<O>>(`/${resource}`, {
          params: {
            ...parsedPaginationParams,
            ...filter,
          },
        })
        .then(response => response.data),
    enabled:
      settings?.enabled !== undefined
        ? settings.enabled && Boolean(authToken)
        : Boolean(authToken),
  })
}

export type UseFindOptions = UseQueryOptions

export type UseFindResult<O> = UseQueryResult<O, AxiosError>

export function useFind<O>(
  id: string | number | undefined,
  resource: string,
  options: UseFindOptions = {},
): UseFindResult<O> {
  const { settings } = options

  const authToken = useAtomValue(authTokenAtom)

  return useQuery<O, AxiosError>({
    queryKey: [resource, 'find', id],
    queryFn: () =>
      api.get<O>(`/${resource}/${id}`).then(response => response.data),
    enabled:
      settings?.enabled !== undefined
        ? settings.enabled && Boolean(authToken) && Boolean(id)
        : Boolean(authToken) && Boolean(id),
  })
}

export type UseCreateResult<O, I> = UseMutationResult<O, AxiosError, I>

export function useCreate<O, I>(
  resource: string,
  options: UseMutationOptions = {},
): UseCreateResult<O, I> {
  const { invalidateQueryKeys = [[resource, 'all']], meta } = options

  const queryClient = useQueryClient()

  return useMutation<O, AxiosError, I>({
    mutationKey: [resource, 'create'],
    mutationFn: (data: I) =>
      api.post<O, I>(`/${resource}`, data).then(res => res.data),
    meta: {
      errorNotification: {
        notificationType: 'created',
      },
      successNotification: {
        notificationType: 'created',
      },
      ...meta,
    },
    onSuccess() {
      return Promise.all(
        invalidateQueryKeys.map(key =>
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          }),
        ),
      )
    },
  })
}

export type UseUpdateResult<O, I> = UseMutationResult<O, AxiosError, I>

export function useUpdate<
  O extends BaseProperties,
  I extends { id?: string | number | undefined },
>(resource: string, options: UseMutationOptions = {}): UseUpdateResult<O, I> {
  const { invalidateQueryKeys = [[resource, 'all']], meta } = options

  const queryClient = useQueryClient()

  return useMutation<O, AxiosError, I>({
    mutationKey: [resource, 'update'],
    mutationFn: (data: I) =>
      api.put<O, I>(`/${resource}/${data.id}`, data).then(res => res.data),
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
      successNotification: {
        notificationType: 'updated',
      },
      ...meta,
    },
    onSuccess(data) {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [resource, 'find', data.id],
        }),
        ...invalidateQueryKeys.map(key =>
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          }),
        ),
      ])
    },
  })
}

export type UseDeleteResult = UseMutationResult<
  void,
  AxiosError,
  string | number
>

export function useDelete(
  resource: string,
  options: UseMutationOptions = {},
): UseDeleteResult {
  const { invalidateQueryKeys = [[resource, 'all']], meta } = options

  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, string | number>({
    mutationKey: [resource, 'delete'],
    mutationFn: (id: string | number) =>
      api.delete<void>(`/${resource}/${id}`).then(response => response.data),
    meta: {
      errorNotification: {
        notificationType: 'deleted',
      },
      successNotification: {
        notificationType: 'deleted',
      },
      ...meta,
    },
    onSuccess() {
      return Promise.all(
        invalidateQueryKeys.map(key =>
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          }),
        ),
      )
    },
    retry: false,
  })
}
