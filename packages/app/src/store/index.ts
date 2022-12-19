import create from 'zustand'

import { createDinoSlice, createUserSlice } from './slices'

import type { DinoSlice, UserSlice } from './slices'

type Store = UserSlice & DinoSlice

const useStore = create<Store>()((...slices) => ({
  ...createUserSlice(...slices),
  ...createDinoSlice(...slices),
}))

export default useStore

export type { Store }
