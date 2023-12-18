import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import packageJson from './package.json';
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  base: `/${packageJson.name}-${packageJson.version}`,
  build: { target: 'es2020' },
  plugins: [
    react(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),
    federation({
      name: 'mfe-1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/module.jsx',
      },
      shared: {
        "global-store": {},
        "zustand": {},
        "react": { requiredVersion: packageJson.dependencies["react"] },
        "react-dom": { requiredVersion: packageJson.dependencies["react-dom"] },
      }
    })],
})
