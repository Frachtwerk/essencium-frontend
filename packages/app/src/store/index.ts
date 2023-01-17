import create from 'zustand'

import type { DinoSlice, UserSlice } from './slices'
import { createDinoSlice, createUserSlice } from './slices'

type Store = UserSlice & DinoSlice

const useStore = create<Store>()((...slices) => ({
  ...createUserSlice(...slices),
  ...createDinoSlice(...slices),
}))

export default useStore

export type { Store }
