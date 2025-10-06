import { defineConfig } from 'vite';
import * as path from 'path'; // ✅ Required for path.resolve
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import react from '@vitejs/plugin-react';

// Simulate CommonJS __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ works now
    },
  },
});
