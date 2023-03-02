import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { User } from 'lib'

import { api } from './api'

export const useGetUsers = (): UseQueryResult<User[], AxiosError> =>
  useQuery(['users'], () =>
    api
      .get<User[]>('/users', {
        baseURL: 'https://jsonplaceholder.typicode.com',
      })
      .then(response => response.data)
  )
