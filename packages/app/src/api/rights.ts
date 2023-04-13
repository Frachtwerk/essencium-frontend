import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RightOutput } from 'types'

import { api, PaginatedResponse } from './api'

const VERSION = 'v1'

export type RightsResponse = PaginatedResponse<RightOutput>

export type GetRightsParams = {
  page: RightsResponse['number']
  size: RightsResponse['size']
}

export const useGetRights = (
  params: GetRightsParams
): UseQueryResult<RightsResponse, AxiosError> =>
  useQuery(['rights', { page: params.page, size: params.size }], () =>
    api
      .get<RightOutput[]>(`${VERSION}/rights`, {
        params: {
          page: params.page,
          size: params.size,
        },
      })
      .then(response => response.data)
  )
