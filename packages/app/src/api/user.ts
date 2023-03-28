import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserOutput } from 'types'

import { api } from './api'

export const useGetUsers = (): UseQueryResult<UserOutput[], AxiosError> =>
  useQuery<UserOutput[], AxiosError>(['users'], () =>
    api
      .get<UserOutput[]>('/users', {
        baseURL: 'https://jsonplaceholder.typicode.com',
      })
      .then(response => response.data)
  )
