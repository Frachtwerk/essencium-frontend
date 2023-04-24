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
  sort?: string
}

export const useGetRights = ({
  page,
  size,
  sort,
}: GetRightsParams): UseQueryResult<RightsResponse, AxiosError> =>
  useQuery(['rights', { page, size, sort }], () =>
    api
      .get<RightOutput[]>(`${VERSION}/rights`, {
        params: {
          page,
          size,
          sort,
        },
      })
      .then(response => response.data)
  )
