import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import packageJson from './package.json';

export default defineConfig({
  base: `/${packageJson.name}-${packageJson.version}`,
  build: { target: 'esnext' },
  plugins: [
    react(),
    federation({
      name: 'mfe-1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/module.jsx',
      },
      shared: ["global-store", "zustand"]
    })],
})
