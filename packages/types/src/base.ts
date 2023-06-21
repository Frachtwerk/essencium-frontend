import { z } from 'zod'

// we use 'nullish' here because this is the datatype that comes from the backend.
// we transform it to 'undefined' because react-form-hooks only works with 'undefined'
export const basePropertiesSchema = z.object({
  id: z.number().transform(value => (value === null ? undefined : value)),
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
