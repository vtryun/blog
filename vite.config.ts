// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ['@mui/*'],
  },
  resolve: {
    alias: {
      lodash: 'lodash-es',
    },
  },
  plugins: [
    // tailwindcss(),
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart(),
    // nitro(),
    viteReact(),
  ],
})