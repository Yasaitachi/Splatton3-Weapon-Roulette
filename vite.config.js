import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // index.htmlがある場所
  base: './', // 相対パスでビルド
  publicDir: 'public', // publicフォルダを静的配信対象に
  build: {
    outDir: 'dist', // 出力先
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html' // エントリーポイントを明示
    }
  },
  server: {
    allowedHosts: ['localhost'] // ローカル動作時のホスト制限解除
  }
});
