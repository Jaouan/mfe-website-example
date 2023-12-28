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
    <div className="react-module">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React module</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          react {count}
        </button>
        <button onClick={() => increasePopulation()}>global {bears}</button>
        <button onClick={() => persistedIncreasePopulation()}>
          persisted global {bearsPersisted}
        </button>
      </div>
    </div>
  );
}

export default App;
