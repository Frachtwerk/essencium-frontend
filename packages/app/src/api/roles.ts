import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRole } from 'lib'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UserRoleResponse = PaginatedResponse<UserRole>

export const useGetRoles = (): UseQueryResult<UserRoleResponse, AxiosError> =>
  useQuery(['roles'], () =>
    api.get<UserRole[]>(`${VERSION}/roles`).then(response => response.data)
  )
