import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RightOutput } from 'types'
import { PaginatedResponse } from 'types/src/base'

import { api } from './api'

const VERSION = 'v1'

export type RightsResponse = PaginatedResponse<RightOutput>

export type GetRightsParams = {
  page: RightsResponse['number']
  size: RightsResponse['size']
}

export const useGetRights = ({
  page,
  size,
}: GetRightsParams): UseQueryResult<RightsResponse, AxiosError> =>
  useQuery(['rights', { page, size }], () =>
    api
      .get<RightOutput[]>(`${VERSION}/rights`, {
        params: {
          page,
          size,
        },
      })
      .then(response => response.data)
  )
