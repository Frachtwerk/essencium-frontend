import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserDummy } from 'lib'

import { api } from './api'

export const useGetUsers = (): UseQueryResult<UserDummy[], AxiosError> =>
  useQuery<UserDummy[], AxiosError>(['users'], () =>
    api
      .get<UserDummy[]>('/users', {
        baseURL: 'https://jsonplaceholder.typicode.com',
      })
      .then(response => response.data)
  )
