/// <reference types='vitest' />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['vitest-fs.config.ts'],
  },
})
