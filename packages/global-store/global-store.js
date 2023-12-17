import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'

export const memoryGlobalStore = createStore((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));

export const persistedGlobalStore = createStore(
    persist(
        (set) => ({
            bears: 0,
            increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            removeAllBears: () => set({ bears: 0 }),
        }),
        {
            name: 'session-global-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export const { getState: getMemoryState, setState: setMemoryState, subscribe: subscribeMemory } = memoryGlobalStore;
export const { getState: getPersistedState, setState: setPersistedState, subscribe: subscribPersisted } = persistedGlobalStore;
