import { z } from 'zod'

export const basePropertiesSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
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
