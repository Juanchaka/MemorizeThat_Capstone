import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/MemorizeThat_Capstone/' : '/',
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.PUBLIC_URL': process.env.NODE_ENV === 'production' ? '"/MemorizeThat_Capstone"' : '"/"'
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
        ? 'https://memorize-that.onrender.com'
        : 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});