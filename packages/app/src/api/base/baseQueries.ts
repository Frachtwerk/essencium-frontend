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

import { BaseProperties, PaginationParams } from '@frachtwerk/essencium-types'

import { createUseGetAll, UseGetAll } from './all'
import { createUseCreate, UseCreate } from './create'
import { createUseDelete, UseDelete } from './delete'
import { createUseFind, UseFind } from './find'
import { createUseGetInfinite, UseGetInfinite } from './infinite'
import { createUseGetPage, UseGetPage } from './page'
import { TBaseFilter } from './types'
import { createUseUpdate, UseUpdate } from './update'

export interface BaseQueryKeys<TFilter extends TBaseFilter> {
  readonly root: readonly [string]
  readonly all: (
    params: TFilter & PaginationParams,
  ) => readonly [string, string, TFilter & PaginationParams]
  readonly infinite: (
    params: TFilter & PaginationParams,
  ) => readonly [string, string, TFilter & PaginationParams]
  readonly page: (
    params: TFilter & PaginationParams,
  ) => readonly [string, string, TFilter & PaginationParams]
  readonly find: (
    id?: string | number,
  ) => readonly [string, string, string | number | undefined]
  readonly create: readonly [string, string]
  readonly update: readonly [string, string]
  readonly delete: readonly [string, string]
}

export function createBaseQueryKeys<TFilter extends TBaseFilter>(
  resource: string,
): BaseQueryKeys<TFilter> {
  return {
    root: [resource],
    all: (params: TFilter & PaginationParams) => [resource, 'all', params],
    infinite: (params: TFilter & PaginationParams) => [
      resource,
      'infinite',
      params,
    ],
    page: (params: TFilter & PaginationParams) => [resource, 'page', params],
    find: (id?: string | number) => [resource, 'find', id],

    create: [resource, 'create'],
    update: [resource, 'update'],
    delete: [resource, 'delete'],
  } as const
}

export interface BaseQueries<
  TOutput extends BaseProperties,
  TInput,
  TFilter extends TBaseFilter,
  TUpdateInput = TInput,
> {
  queryKeys: BaseQueryKeys<TFilter>
  useGetAll: UseGetAll<TOutput, TFilter>
  useGetInfinite: UseGetInfinite<TOutput, TFilter>
  useGetPage: UseGetPage<TOutput, TFilter>
  useFind: UseFind<TOutput>
  useCreate: UseCreate<TOutput, TInput>
  useUpdate: UseUpdate<TOutput, TUpdateInput & { id?: string | number }>
  useDelete: UseDelete<void, string | number>
}

export function createBaseQueries<
  TOutput extends BaseProperties,
  TInput,
  TFilter extends TBaseFilter,
  TUpdateInput = TInput,
>(resource: string): BaseQueries<TOutput, TInput, TFilter, TUpdateInput> {
  const queryKeys = createBaseQueryKeys<TFilter>(resource)

  const useGetAll = createUseGetAll<TOutput, TFilter>(resource)
  const useGetInfinite = createUseGetInfinite<TOutput, TFilter>(resource)
  const useGetPage = createUseGetPage<TOutput, TFilter>(resource)

  const useFind = createUseFind<TOutput>(resource)

  const useCreate = createUseCreate<TOutput, TInput>(resource)
  const useUpdate = createUseUpdate<
    TOutput,
    TUpdateInput & { id?: string | number }
  >(resource)
  const useDelete = createUseDelete<void, string | number>(resource)

  return {
    queryKeys,

    useGetAll,
    useGetInfinite,
    useGetPage,

    useFind,

    useCreate,
    useUpdate,
    useDelete,
  }
}
