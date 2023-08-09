import { create } from 'zustand'
import { DogsDataBackend } from '../../models/dog'

type dogStore = {
  dogs: DogsDataBackend[]
  setDogList: (dogs: DogsDataBackend[]) => void
}

export const dogListStore = create<dogStore>((set) => ({
  dogs: [],
  setDogList: (dogs) => set({ dogs }),
}))
