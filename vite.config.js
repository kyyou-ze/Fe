import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eruda from 'vite-plugin-eruda'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eruda()
    ],
})
