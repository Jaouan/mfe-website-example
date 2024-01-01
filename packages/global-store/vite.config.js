import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: "global-store.js",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["zustand/vanilla", "zustand/middleware"],
    }
  }
})
