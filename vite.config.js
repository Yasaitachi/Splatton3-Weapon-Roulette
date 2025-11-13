import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",        // Firebase Hosting では相対パスが必須
  build: {
    outDir: "dist"   // Firebase hosting と同じディレクトリ
  }
})
