import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/hospital-F/',
  server:{
    proxy:{
      '/api': "https://api-hospital-3n18.onrender.com"
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
