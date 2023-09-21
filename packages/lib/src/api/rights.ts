/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { PaginatedResponse, RightOutput } from '@frachtwerk/essencium-types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { api } from './api'
import { authTokenAtom } from './auth'

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
