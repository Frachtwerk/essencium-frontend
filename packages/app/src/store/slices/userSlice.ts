import { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { User } from 'lib'

import { Store } from '@/store'

type UserSlice = {
  users: User[]
  addUser: (user: User) => void
  clearUsers: () => void
}

const createUserSlice: StateCreator<
  Store,
  [],
  [['zustand/devtools', never]],
  UserSlice
> = devtools(
  set => ({
    users: [],
    addUser: (user: User) => {
      set(state => ({
        ...state,
        users: [...state.users, user],
      }))
    },
    clearUsers: () => {
      set(state => ({
        ...state,
        users: [],
      }))
    },
  }),
  {
    name: 'User Slice',
    enabled: import.meta.env.DEV,
  }
)

export type { UserSlice }

export { createUserSlice }
