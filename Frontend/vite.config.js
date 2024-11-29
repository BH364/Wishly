import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures Vercel serves the app correctly from the root
  build: {
    outDir: 'dist', // This is the output directory where Vercel expects the build files
  },
})
