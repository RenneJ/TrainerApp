import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://rennej.github.io/TrainerApp/',
  plugins: [
    react(),
    chunkSplitPlugin()
  ],
})
