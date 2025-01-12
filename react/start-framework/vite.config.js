import path from 'node:path';
import process from 'node:process';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';

process.env.BROWSER = 'google-chrome';
process.env.BROWSER_ARGS = '--incognito';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 3000,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.join(process.cwd(), '../../common-dependencies'),
      ],
    },
  },
  base: './',
});
