import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                       // 外部アクセス許可
    port: 5173,                       // 任意のポート
    allowedHosts: ['.trycloudflare.com'] // Cloudflared経由のアクセスを許可
  }
})
