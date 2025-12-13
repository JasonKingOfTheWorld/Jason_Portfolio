import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for the geminiService
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  build: {
    rollupOptions: {
      external: ['@google/genai']
    }
  }
});