import { createStore } from 'zustand/vanilla';

export const globalStore = createStore((set) => ({
  bears: 0,
  manifest: {},
  updateManifest: (newManifest) => set({ manifest: newManifest }),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));


// TODO: PersistedStore, SessionStore, MemoryStore ?

export const { getState, setState, subscribe } = globalStore;
