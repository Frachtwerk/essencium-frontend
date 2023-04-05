import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UsersResponse = PaginatedResponse<UserOutput>

export function useGetUsers(): UseQueryResult<UsersResponse, AxiosError> {
  const query = useQuery<UsersResponse, AxiosError>({
    queryKey: ['getUsers'],
    queryFn: () =>
      api
        .get<UsersResponse>(`${VERSION}/users`)
        .then(response => response.data),
  })

  return query
}
