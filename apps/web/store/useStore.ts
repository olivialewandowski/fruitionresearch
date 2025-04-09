import { create } from 'zustand'

type Store = {
  count: number
  increment: () => void
  decrement: () => void
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export default useStore
