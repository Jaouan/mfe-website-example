import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe-1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/mfe.jsx',
      }
    })],
})
