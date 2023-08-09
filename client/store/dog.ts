import { create } from 'zustand'
import { DogsDataBackend } from '../../models/dog'

type dogsStore = {
  dogs: DogsDataBackend[]
  setDogList: (dogs: DogsDataBackend[]) => void
}

export const dogListStore = create<dogsStore>((set) => ({
  dogs: [],
  setDogList: (dogs) => set({ dogs }),
}))
