import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  rollupOptions: {
    external: [
      /^@mui\/material/,
      /^@mui\/icons-material/,
      /^@mui\/styles/,
      /^@emotion\/react/,
      /^tss-react/,
    ],
  },
});
