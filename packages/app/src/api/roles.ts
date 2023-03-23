import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { UserRole } from 'lib'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UserRoleResponse = PaginatedResponse<UserRole>

export function useGetRoles(): UseQueryResult<UserRoleResponse, AxiosError> {
  const query = useQuery<UserRoleResponse, AxiosError>({
    queryKey: ['getRoles'],
    queryFn: () =>
      api
        .get<UserRoleResponse>(`${VERSION}/roles`)
        .then(response => response.data),
  })

  return query
}
