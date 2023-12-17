import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'mfe-1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './global-store.js',
      }
    })],
})
