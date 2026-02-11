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
      ...restMutationOptions,
    })
  }
