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

import { z } from 'zod'

// we use 'nullish' here because this is the datatype that comes from the backend.
// we transform it to 'undefined' because react-form-hooks only works with 'undefined'
export const basePropertiesSchema = z.object({
  id: z
    .union([z.uuid(), z.number()])
    .transform(value => (value === null ? undefined : value)),
  createdAt: z.string().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.string().nullish(),
  updatedBy: z.string().nullish(),
})

export type BaseProperties = z.infer<typeof basePropertiesSchema>

export type PaginatedResponse<T> = {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    unpaged: boolean
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
  totalPages: number
}

export const stringSchema = z.string().trim().min(1)

export const idSchema = z
  .number({
    error: iss =>
      iss.input === null || iss.input === undefined
        ? 'validation.general.required'
        : 'validation.general.invalidId',
  })
  .gte(1, 'validation.general.invalidId')

export const baseInputSchema = z.object({
  id: idSchema.optional(),
})

export type BaseInput = z.infer<typeof baseInputSchema>
