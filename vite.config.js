import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // プロジェクトのルートディレクトリ
  base: './', // 相対パスでビルド
  publicDir: 'public', // 静的ファイル（画像・フォント・faviconなど）
  build: {
    outDir: 'dist', // ビルド出力先
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html' // エントリーポイント
    }
  }
});
