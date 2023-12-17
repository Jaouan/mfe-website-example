import { useState } from "react";
import { useStore } from "zustand";
import { persistedGlobalStore, memoryGlobalStore } from "global-store";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

const useMemoryGlobalStore = (selector) =>
  useStore(memoryGlobalStore, selector);
const usePersistedGlobalStore = (selector) =>
  useStore(persistedGlobalStore, selector);

function App() {
  const bears = useMemoryGlobalStore((state) => state.bears);
  const increasePopulation = useMemoryGlobalStore(
    (state) => state.increasePopulation
  );
  const bearsPersisted = usePersistedGlobalStore((state) => state.bears);
  const persistedIncreasePopulation = usePersistedGlobalStore(
    (state) => state.increasePopulation
  );
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          react {count}
        </button>
        <button onClick={() => increasePopulation()}>
          global {bears}
        </button>
        <button onClick={() => persistedIncreasePopulation()}>
          persisted global {bearsPersisted}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
