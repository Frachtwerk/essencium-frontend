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
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '../api'
import { RequestOptions } from './types'

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
      onSuccess(data, variables, context, mutation) {
        onSuccess?.(data, variables, context, mutation)

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
