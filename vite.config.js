import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",      // Firebase Hosting の rewrites を使う場合は絶対パスにする
  build: {
    outDir: "dist" // Firebase hosting の public と同じ
  }
})
