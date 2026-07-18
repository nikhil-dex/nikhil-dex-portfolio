import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // 1. import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),                            // 2. add to plugins
  ],
})