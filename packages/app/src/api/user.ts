import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserOutput } from 'types'
import { PaginatedResponse } from 'types/src/base'

import { api } from './api'

const VERSION = 'v1'

export type UsersResponse = PaginatedResponse<UserOutput>

export type GetUsersParams = {
  page: UsersResponse['number']
  size: UsersResponse['size']
}

export function useGetUsers(
  params: GetUsersParams
): UseQueryResult<UsersResponse, AxiosError> {
  const query = useQuery<UsersResponse, AxiosError>({
    queryKey: ['getUsers', { page: params.page, size: params.size }],
    queryFn: () =>
      api
        .get<UsersResponse>(`${VERSION}/users`, {
          params: {
            page: params.page,
            size: params.size,
          },
        })
        .then(response => response.data),
  })

  return query
}
