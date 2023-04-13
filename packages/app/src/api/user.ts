import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UsersResponse = PaginatedResponse<UserOutput>

export function useGetUsers(
  page: UsersResponse['number'],
  size: UsersResponse['size']
): UseQueryResult<UsersResponse, AxiosError> {
  const query = useQuery<UsersResponse, AxiosError>({
    queryKey: ['getUsers', { page, size }],
    queryFn: () =>
      api
        .get<UsersResponse>(`${VERSION}/users`, {
          params: {
            page,
            size,
          },
        })
        .then(response => response.data),
  })

  return query
}
