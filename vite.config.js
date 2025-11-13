export default defineConfig({
  plugins: [react()],
  base: "./",      // ← これが必須
  build: {
    outDir: "dist"
  }
})
