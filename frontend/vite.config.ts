import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,           // Porta onde o frontend vai rodar (pode ajustar)
    open: true,           // Abre o navegador automaticamente ao rodar o dev server
    cors: true,           // Habilita CORS para comunicação com backend
    proxy: {
      '/reservas': 'http://localhost:2000', // endereço do backend
    },
  },
  resolve: {
    alias: {
      '@': '/src',        // Alias pra facilitar importações, ex: import Button from '@/components/Button'
    },
  },
})