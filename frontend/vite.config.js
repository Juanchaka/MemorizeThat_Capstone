import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/MemorizeThat_Capstone/",
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.PUBLIC_URL': '"/MemorizeThat_Capstone"',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://memorize-that.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});