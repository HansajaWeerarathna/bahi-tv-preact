import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves the project at /bahi-tv-preact/; local dev and tests stay at /.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/bahi-tv-preact/' : '/',
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: { target: 'chrome111' },
  server: { port: 5173, strictPort: true },
  test: { environment: 'node' },
});
