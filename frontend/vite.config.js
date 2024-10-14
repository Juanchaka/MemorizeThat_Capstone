import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/MemorizeThat_Capstone/' : 'process.dev.env.VITE_APP_API_URL',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  publicDir: 'public',
  define: {
    'process.env.BASE_URL': process.env.NODE_ENV === 'production' ? '"/MemorizeThat_Capstone"' : '"/"'
  },
  server: {
    proxy: {
      '/': {
        target: process.env.NODE_ENV === 'production' 
        ? 'https://memorize-that.onrender.com'
        : 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});