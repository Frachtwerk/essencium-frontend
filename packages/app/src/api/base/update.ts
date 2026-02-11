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

import { BaseProperties } from '@frachtwerk/essencium-types/src/base'
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '../api'
import { RequestOptions } from './types'

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
  TInput extends { id?: string | number },
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
      onSuccess(data, variables, context, mutation) {
        onSuccess?.(data, variables, context, mutation)

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
