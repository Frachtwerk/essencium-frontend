import { useQuery, UseQueryResult } from '@tanstack/react-query'
import type { UserRole } from 'lib'

import { api } from './api'

const VERSION = 'v1'

type UserRolesResponse = {
  content: UserRole[]
}

export function useGetRoles(): UseQueryResult<UserRolesResponse, unknown> {
  const query = useQuery({
    queryKey: ['getRoles'],
    queryFn: () =>
      api.get<UserRolesResponse>(`${VERSION}/roles`).then(res => res.data),
  })

  return query
}
