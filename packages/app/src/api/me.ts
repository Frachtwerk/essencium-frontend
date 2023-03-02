import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { atom, useAtom, useStore } from 'jotai'

// eslint-disable-next-line import/no-cycle
import { api } from './api'

type UserRole = {
  createdAt: string
  createdBy: string
  description: string
  editable: boolean
  id: number | undefined
  name: string
  protected: boolean
  rights: UserRights[]
  updatedAt: string
  updatedBy: string
}

type UserRights = {
  description: string
  id: number
  name: string
}

export type User = {
  createdAt: string
  createdBy: string
  email: string
  enabled: boolean
  firstName: string
  id: number
  lastName: string
  locale: string
  mobile: number
  phone: number
  role: UserRole
  source: string
  updatedAt: string
  updatedBy: string
}

const VERSION = 'v1'

export const userAtom = atom<User | null>(null)

export function useGetUser(): UseQueryResult<User, unknown> {
  const store = useStore()

  const [, setUser] = useAtom(userAtom)

  const query = useQuery({
    queryKey: ['getUser'],
    queryFn: () => api.get(`${VERSION}/users/me`).then(res => res.data),
    onSuccess(data: User) {
      setUser(data)
      store.set(userAtom, data)
    },
  })

  return query
}
