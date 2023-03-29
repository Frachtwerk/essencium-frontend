import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RoleOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type RolesResponse = PaginatedResponse<RoleOutput>

export function useGetRoles(): UseQueryResult<RolesResponse, AxiosError> {
  const query = useQuery<RolesResponse, AxiosError>({
    queryKey: ['getRoles'],
    queryFn: () =>
      api
        .get<RolesResponse>(`${VERSION}/roles`)
        .then(response => response.data),
  })

  return query
}
