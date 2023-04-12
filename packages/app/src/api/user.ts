import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UsersResponse = PaginatedResponse<UserOutput>

export function useGetUsers(
  page: number,
  size: number
): UseQueryResult<UsersResponse, AxiosError> {
  const query = useQuery<UsersResponse, AxiosError>({
    queryKey: ['getUsers', { page, size }],
    queryFn: () =>
      api
        .get<UsersResponse>(`${VERSION}/users?page=${page}&size=${size}`)
        .then(response => response.data),
  })

  return query
}
