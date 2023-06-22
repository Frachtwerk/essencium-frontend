import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@frachtwerk/essencium-lib',
        replacement: path.resolve(__dirname, '../lib/src/index.ts'),
      },
      {
        find: '@frachtwerk/essencium-types',
        replacement: path.resolve(__dirname, '../types/src/index.ts'),
      },
    ],
  },
})
