import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

const devModulePrefix = process.env.NODE_ENV === "development" ? "${document.location.origin}" : "";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'app',
      remotes: {
        layout: {
          external: `(async () => {
            const manifest = await (await fetch("/manifest-shell.json")).json();
            return \`${devModulePrefix}\${manifest.modules.layout}\`;
          })()`,
          externalType: 'promise'
        }
      },
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})