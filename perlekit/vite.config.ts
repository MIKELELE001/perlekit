import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory')) return 'charts';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('react/')) return 'vendor';
        },
      },
    },
  },
});
