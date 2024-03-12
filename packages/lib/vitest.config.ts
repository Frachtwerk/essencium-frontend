import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: [
      {
        find: '@frachtwerk/essencium-types',
        replacement: path.resolve(__dirname, '../types/src/index.ts'),
      },
    ],
  },
})
