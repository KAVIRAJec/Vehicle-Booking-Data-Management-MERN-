import { resolve } from 'path'
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['rsuite'],
  },
  build: {
    sourcemap: false,
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      //external: ['rsuite'],
    },
  },
})