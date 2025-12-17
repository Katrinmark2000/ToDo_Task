import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ToDo_Task/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/bored': {
        target: 'https://bored-api.appbrewery.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bored/, ''),
      },
    },
  },
})
