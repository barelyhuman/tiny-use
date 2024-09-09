import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts', './src/fetch.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
})
