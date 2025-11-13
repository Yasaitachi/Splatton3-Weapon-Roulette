import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",  // Firebaseでは相対パス必須
  build: {
    outDir: "dist"  // デフォルトでOK
  }
})
