import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/hearthfield-game/',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: {
    port: 8080,
    open: true
  }
})