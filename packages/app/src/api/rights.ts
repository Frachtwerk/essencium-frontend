import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RightOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type RightsResponse = PaginatedResponse<RightOutput>

export const useGetRights = (): UseQueryResult<RightsResponse, AxiosError> =>
  useQuery(['rights'], () =>
    api.get<RightOutput[]>(`${VERSION}/rights`).then(response => response.data)
  )
