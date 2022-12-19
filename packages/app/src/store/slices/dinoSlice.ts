import { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Store } from '@/store'

type DinoSlice = {
  dinos: number
  increaseCount: () => void
  resetCount: () => void
}

const createDinoSlice: StateCreator<
  Store,
  [],
  [['zustand/devtools', never]],
  DinoSlice
> = devtools(
  set => ({
    dinos: 0,
    increaseCount: () =>
      set((state: { dinos: number }) => ({ dinos: state.dinos + 1 })),
    resetCount: () => set({ dinos: 0 }),
  }),
  {
    name: 'Dino Slice',
    enabled: import.meta.env.DEV,
  }
)

export type { DinoSlice }

export { createDinoSlice }
