import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRight } from 'lib'

import { api } from './api'

const VERSION = 'v1'

export const useGetRights = (): UseQueryResult<UserRight[], AxiosError> =>
  useQuery(['rights'], () =>
    api.get<UserRight[]>(`${VERSION}/rights`).then(response => response.data)
  )
