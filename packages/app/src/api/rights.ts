import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRight } from 'lib'

import { api } from './api'

const VERSION = 'v1'

// needs abstraction in API layer
type UserRightResponse = {
  content: UserRight[]
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

export const useGetRights = (): UseQueryResult<UserRightResponse, AxiosError> =>
  useQuery(['rights'], () =>
    api.get<UserRight[]>(`${VERSION}/rights`).then(response => response.data)
  )
