import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRight } from 'lib'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UserRightsResponse = PaginatedResponse<UserRight>

export const useGetRights = (): UseQueryResult<
  UserRightsResponse,
  AxiosError
> =>
  useQuery(['rights'], () =>
    api.get<UserRight[]>(`${VERSION}/rights`).then(response => response.data)
  )
