import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRight } from 'lib'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type UserRightResponse = PaginatedResponse<UserRight>

export const useGetRights = (): UseQueryResult<UserRightResponse, AxiosError> =>
  useQuery(['rights'], () =>
    api.get<UserRight[]>(`${VERSION}/rights`).then(response => response.data)
  )
