import { PaginatedResponse, RightOutput } from '@frachtwerk/essencium-types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { authTokenAtom } from '@/api/auth'

import { api } from './api'

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
}: GetRightsParams): UseQueryResult<RightsResponse, AxiosError> => {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery({
    enabled: Boolean(authToken),
    queryKey: ['rights', { page, size, sort }],
    queryFn: () =>
      api
        .get<RightOutput[]>('/rights', {
          params: {
            page,
            size,
            sort,
          },
        })
        .then(response => response.data),
  })
}
