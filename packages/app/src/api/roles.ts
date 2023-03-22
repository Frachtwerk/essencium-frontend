import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { UserRole } from 'lib'

import { api } from './api'

const VERSION = 'v1'

type UserRolesResponse = {
  content: UserRole[]
}

export function useGetRoles(): UseQueryResult<UserRolesResponse, AxiosError> {
  const query = useQuery<UserRolesResponse, AxiosError>({
    queryKey: ['getRoles'],
    queryFn: () =>
      api
        .get<UserRolesResponse>(`${VERSION}/roles`)
        .then(response => response.data),
  })

  return query
}
