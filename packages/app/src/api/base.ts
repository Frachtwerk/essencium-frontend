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
import { AxiosError, AxiosRequestConfig } from 'axios'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

import { parsePaginationParams } from '@/utils/pagination'

import { api } from './api'
import { authTokenAtom } from './auth'

type TBaseFilter = Record<string, unknown>

interface FilterOptions<TFilter extends TBaseFilter> {
  filter?: TFilter
}

interface RequestOptions {
  url?: string
  requestConfig?: AxiosRequestConfig
}

export interface UseGetInfiniteOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter>,
    RequestOptions {
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

    const parsedPaginationParams = parsePaginationParams(pagination)

    const { enabled: settingsEnabled, ...restInfiniteOptions } = infiniteOptions

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
          .get<PaginatedResponse<TOutput>>(url, {
            ...requestConfig,
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
      ...restInfiniteOptions,
    })

    return {
      ...query,
      items: query.data?.pages.flatMap(page => page.content) ?? [],
    }
  }

export interface UseGetAllOptions<TOutput, TFilter extends TBaseFilter>
  extends FilterOptions<TFilter>,
    RequestOptions {
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

    const parsedPaginationParams = parsePaginationParams(pagination)

    const { enabled: settingsEnabled, ...restQueryOptions } = queryOptions

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
          .get<PaginatedResponse<TOutput>>(url, {
            ...requestConfig,
            params: {
              ...parsedPaginationParams,
              ...filter,
            },
          })
          .then(response => response.data),
      enabled,
      ...restQueryOptions,
    })
  }

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

    const enabled =
      settingsEnabled !== undefined
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

export interface UseCreateOptions<TOutput, TInput> extends RequestOptions {
  invalidateQueryKeys?: Array<string | string[]>
  mutationOptions?: Omit<
    UseMutationOptions<TOutput, AxiosError<TOutput>, TInput>,
    'mutationKey' | 'mutationFn'
  >
}

export type UseCreateResult<TOutput, TInput> = UseMutationResult<
  TOutput,
  AxiosError<TOutput>,
  TInput
>

export type UseCreate<TOutput, TInput> = (
  options?: UseCreateOptions<TOutput, TInput>,
) => UseCreateResult<TOutput, TInput>

export const createUseCreate = <TOutput, TInput>(
  resource: string,
  options?: UseCreateOptions<TOutput, TInput>,
): UseCreate<TOutput, TInput> =>
  function useCreate(createOptions) {
    const {
      url = `/${resource}`,
      invalidateQueryKeys = [[resource, 'all']],
      requestConfig,
      mutationOptions = {},
    } = { ...options, ...createOptions }

    const queryClient = useQueryClient()

    const { meta, onSuccess, ...restMutationOptions } = mutationOptions

    return useMutation<TOutput, AxiosError<TOutput>, TInput>({
      mutationKey: [resource, 'create'],
      mutationFn: (data: TInput) =>
        api
          .post<TOutput, TInput>(url, data, requestConfig)
          .then(res => res.data),
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
      ...restMutationOptions,
    })
  }

export interface UseUpdateOptions<TOutput, TInput> extends RequestOptions {
  invalidateQueryKeys?: Array<string | string[]>
  mutationOptions?: Omit<
    UseMutationOptions<TOutput, AxiosError<TOutput>, TInput>,
    'mutationKey' | 'mutationFn'
  >
}

export type UseUpdateResult<TOutput, TInput> = UseMutationResult<
  TOutput,
  AxiosError<TOutput>,
  TInput
>

export type UseUpdate<TOutput, TInput> = (
  options?: UseUpdateOptions<TOutput, TInput>,
) => UseUpdateResult<TOutput, TInput>

export const createUseUpdate = <
  TOutput extends BaseProperties,
  TInput extends { id?: string | number | undefined },
>(
  resource: string,
  options?: UseUpdateOptions<TOutput, TInput>,
): UseUpdate<TOutput, TInput> =>
  function useUpdate(updateOptions) {
    const {
      url,
      invalidateQueryKeys = [[resource, 'all']],
      requestConfig,
      mutationOptions = {},
    } = { ...options, ...updateOptions }

    const queryClient = useQueryClient()

    const { meta, onSuccess, ...restMutationOptions } = mutationOptions

    return useMutation<TOutput, AxiosError<TOutput>, TInput>({
      mutationKey: [resource, 'update'],
      mutationFn: (data: TInput) =>
        api
          .put<TOutput, TInput>(
            url ?? `/${resource}/${data.id}`,
            data,
            requestConfig,
          )
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
      ...restMutationOptions,
    })
  }

export interface UseDeleteOptions<TOutput, TInput> extends RequestOptions {
  invalidateQueryKeys?: Array<string | string[]>
  mutationOptions?: Omit<
    UseMutationOptions<TOutput, AxiosError<TOutput>, TInput>,
    'mutationKey' | 'mutationFn' | 'retry'
  >
}

export type UseDeleteResult<
  TOutput = void,
  TInput = string | number,
> = UseMutationResult<TOutput, AxiosError<TOutput>, TInput>

export type UseDelete<TOutput = void, TInput = string | number> = (
  options?: UseDeleteOptions<TOutput, TInput>,
) => UseDeleteResult<TOutput, TInput>

export const createUseDelete = <TOutput = void, TInput = string | number>(
  resource: string,
  options?: UseDeleteOptions<TOutput, TInput>,
): UseDelete<TOutput, TInput> =>
  function useDelete(deleteOptions) {
    const {
      url,
      invalidateQueryKeys = [[resource, 'all']],
      requestConfig,
      mutationOptions = {},
    } = { ...options, ...deleteOptions }

    const queryClient = useQueryClient()

    const { meta, onSuccess, ...restMutationOptions } = mutationOptions

    return useMutation<TOutput, AxiosError<TOutput>, TInput>({
      mutationKey: [resource, 'delete'],
      mutationFn: (id: TInput) =>
        api
          .delete<TOutput>(url ?? `/${resource}/${id}`, requestConfig)
          .then(response => response.data),
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
      ...restMutationOptions,
    })
  }
