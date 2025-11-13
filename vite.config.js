import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",      // Firebase では必ず相対パスにする
  build: {
    outDir: "dist" // Firebase hosting の public と同じ
  }
})
