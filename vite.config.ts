import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: { target: 'chrome111' },
  server: { port: 5173, strictPort: true },
  test: { environment: 'node' },
});
