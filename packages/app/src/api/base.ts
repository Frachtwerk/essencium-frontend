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
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

import { parsePaginationParams } from '@/utils/pagination'

import { api } from './api'
import { authTokenAtom } from './auth'

type TBaseFilter = Record<string, unknown>

interface FilterOptions<TFilter extends TBaseFilter> {
  filter?: TFilter
}

interface PaginationOptions {
  pagination?: Partial<PaginationParams>
}

export interface UseGetInfiniteOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter> {
  pagination?: Omit<PaginationParams, 'page'>
  settings?: Omit<
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

export function useGetInfinite<TOutput, TFilter extends TBaseFilter>(
  resource: string,
  options: UseGetInfiniteOptions<TOutput, TFilter> = {},
): UseGetInfiniteResult<TOutput> {
  const { settings = {}, pagination, filter } = options

  const authToken = useAtomValue(authTokenAtom)

  const parsedPaginationParams = parsePaginationParams(pagination)

  const { enabled: settingsEnabled, ...infiniteSettings } = settings

  const enabled =
    settingsEnabled !== undefined
      ? settingsEnabled && Boolean(authToken)
      : Boolean(authToken)

  const query = useInfiniteQuery<
    PaginatedResponse<TOutput>,
    AxiosError<PaginatedResponse<TOutput>>
  >({
    queryKey: [resource, 'infinite', filter, parsedPaginationParams],
    queryFn: ({ pageParam }) =>
      api
        .get<PaginatedResponse<TOutput>>(`/${resource}`, {
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
    enabled,
    ...infiniteSettings,
  })

  return {
    ...query,
    items: query.data?.pages.flatMap(page => page.content) ?? [],
  }
}

export interface UseGetAllOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter> {
  pagination?: Pick<PaginationParams, 'sort'>
  settings?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResponse<TOutput>,
      AxiosError<PaginatedResponse<TOutput>>
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'select'
  >
}

export type UseGetAllResult<TOutput> = UseGetInfiniteResult<TOutput>

export function useGetAll<TOutput, TFilter extends TBaseFilter>(
  resource: string,
  options: UseGetAllOptions<TOutput, TFilter> = {},
): UseGetAllResult<TOutput> {
  const { settings, pagination, filter } = options

  const parsedPaginationParams = parsePaginationParams({
    ...pagination,
    size: 2000,
  })

  const query = useGetInfinite<TOutput, TFilter>(resource, {
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

export interface UseGetPageOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter>,
    PaginationOptions {
  settings?: Omit<
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

export function useGetPage<TOutput, TFilter extends TBaseFilter>(
  resource: string,
  options: UseGetPageOptions<TOutput, TFilter> = {},
): UseGetPageResult<TOutput> {
  const { settings = {}, pagination, filter } = options

  const authToken = useAtomValue(authTokenAtom)

  const parsedPaginationParams = parsePaginationParams(pagination)

  const { enabled: settingsEnabled, ...querySettings } = settings

  const enabled =
    settingsEnabled !== undefined
      ? settingsEnabled && Boolean(authToken)
      : Boolean(authToken)

  return useQuery<
    PaginatedResponse<TOutput>,
    AxiosError<PaginatedResponse<TOutput>>
  >({
    queryKey: [resource, 'all', filter, parsedPaginationParams],
    queryFn: () =>
      api
        .get<PaginatedResponse<TOutput>>(`/${resource}`, {
          params: {
            ...parsedPaginationParams,
            ...filter,
          },
        })
        .then(response => response.data),
    enabled,
    ...querySettings,
  })
}

export interface UseFindOptions<TOutput> {
  settings?: Omit<
    UseQueryOptions<TOutput, AxiosError<TOutput>>,
    'queryKey' | 'queryFn'
  >
}

export type UseFindResult<TOutput> = UseQueryResult<
  TOutput,
  AxiosError<TOutput>
>
export function useFind<TOutput>(
  id: string | number | undefined,
  resource: string,
  options: UseFindOptions<TOutput> = {},
): UseFindResult<TOutput> {
  const { settings = {} } = options

  const authToken = useAtomValue(authTokenAtom)

  const { enabled: settingsEnabled, ...querySettings } = settings

  const enabled =
    settingsEnabled !== undefined
      ? settingsEnabled && Boolean(authToken) && Boolean(id)
      : Boolean(authToken) && Boolean(id)

  return useQuery<TOutput, AxiosError<TOutput>>({
    queryKey: [resource, 'find', id],
    queryFn: () =>
      api.get<TOutput>(`/${resource}/${id}`).then(response => response.data),
    enabled,
    ...querySettings,
  })
}

export interface UseCreateOptions<TOutput, TInput> {
  invalidateQueryKeys?: Array<string | string[]>
  settings?: Omit<
    UseMutationOptions<TOutput, AxiosError<TOutput>, TInput>,
    'mutationKey' | 'mutationFn'
  >
}

export type UseCreateResult<TOutput, TInput> = UseMutationResult<
  TOutput,
  AxiosError<TOutput>,
  TInput
>

export function useCreate<TOutput, TInput>(
  resource: string,
  options: UseCreateOptions<TOutput, TInput> = {},
): UseCreateResult<TOutput, TInput> {
  const queryClient = useQueryClient()

  const { invalidateQueryKeys = [[resource, 'all']], settings = {} } = options

  const { meta, onSuccess, ...mutationSettings } = settings

  return useMutation<TOutput, AxiosError<TOutput>, TInput>({
    mutationKey: [resource, 'create'],
    mutationFn: (data: TInput) =>
      api.post<TOutput, TInput>(`/${resource}`, data).then(res => res.data),
    meta: {
      errorNotification: {
        notificationType: 'created',
      },
      successNotification: {
        notificationType: 'created',
      },
      ...meta,
    },
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables, context)

      return Promise.all(
        invalidateQueryKeys.map(key =>
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          }),
        ),
      )
    },
    ...mutationSettings,
  })
}

export interface UseUpdateOptions<TOutput, TInput> {
  invalidateQueryKeys?: Array<string | string[]>
  settings?: Omit<
    UseMutationOptions<TOutput, AxiosError<TOutput>, TInput>,
    'mutationKey' | 'mutationFn'
  >
}

export type UseUpdateResult<TOutput, TInput> = UseMutationResult<
  TOutput,
  AxiosError<TOutput>,
  TInput
>

export function useUpdate<
  TOutput extends BaseProperties,
  TInput extends { id?: string | number | undefined },
>(
  resource: string,
  options: UseUpdateOptions<TOutput, TInput> = {},
): UseUpdateResult<TOutput, TInput> {
  const queryClient = useQueryClient()

  const { invalidateQueryKeys = [[resource, 'all']], settings = {} } = options

  const { meta, onSuccess, ...mutationSettings } = settings

  return useMutation<TOutput, AxiosError<TOutput>, TInput>({
    mutationKey: [resource, 'update'],
    mutationFn: (data: TInput) =>
      api
        .put<TOutput, TInput>(`/${resource}/${data.id}`, data)
        .then(res => res.data),
    meta: {
      errorNotification: {
        notificationType: 'updated',
      },
      successNotification: {
        notificationType: 'updated',
      },
      ...meta,
    },
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables, context)

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
    ...mutationSettings,
  })
}

export interface UseDeleteOptions<TOutput, TInput> {
  invalidateQueryKeys?: Array<string | string[]>
  settings?: Omit<
    UseMutationOptions<TOutput, AxiosError<TOutput>, TInput>,
    'mutationKey' | 'mutationFn' | 'retry'
  >
}

export type UseDeleteResult<
  TOutput = void,
  TInput = string | number,
> = UseMutationResult<TOutput, AxiosError<TOutput>, TInput>

export function useDelete<TOutput = void, TInput = string | number>(
  resource: string,
  options: UseDeleteOptions<TOutput, TInput> = {},
): UseDeleteResult<TOutput, TInput> {
  const queryClient = useQueryClient()

  const { invalidateQueryKeys = [[resource, 'all']], settings = {} } = options

  const { meta, onSuccess, ...mutationSettings } = settings

  return useMutation<TOutput, AxiosError<TOutput>, TInput>({
    mutationKey: [resource, 'delete'],
    mutationFn: (id: TInput) =>
      api.delete<TOutput>(`/${resource}/${id}`).then(response => response.data),
    meta: {
      errorNotification: {
        notificationType: 'deleted',
      },
      successNotification: {
        notificationType: 'deleted',
      },
      ...meta,
    },
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables, context)

      return Promise.all(
        invalidateQueryKeys.map(key =>
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          }),
        ),
      )
    },
    retry: false,
    ...mutationSettings,
  })
}
