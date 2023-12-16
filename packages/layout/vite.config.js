import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'layout',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/module.js',
      }
    })],
})
