import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RightOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type RightsResponse = PaginatedResponse<RightOutput>

export const useGetRights = (
  page: RightsResponse['number'],
  size: RightsResponse['size']
): UseQueryResult<RightsResponse, AxiosError> =>
  useQuery(['rights', { page, size }], () =>
    api
      .get<RightOutput[]>(`${VERSION}/rights?page=${page}&size=${size}`)
      .then(response => response.data)
  )
