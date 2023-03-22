import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRole } from 'lib'

import { api } from './api'

const VERSION = 'v1'

// TODO: needs abstraction in API layer
export type UserRoleResponse = {
  content: UserRole[]
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

export const useGetRoles = (): UseQueryResult<UserRoleResponse, AxiosError> =>
  useQuery(['roles'], () =>
    api.get<UserRole[]>(`${VERSION}/roles`).then(response => response.data)
  )
