import { defineConfig } from 'father'

export default defineConfig({
  esm: {
    output: 'dist/es'
  },
  cjs: {
    output: 'dist/lib'
  }
})
