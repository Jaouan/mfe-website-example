import { createStore } from 'zustand/vanilla'

export const globalStore = createStore((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));

// TODO: PersistedStore, SessionStore, MemoryStore ?

export const { getState, setState, subscribe } = globalStore;
