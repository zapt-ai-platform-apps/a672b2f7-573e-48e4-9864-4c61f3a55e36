import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "zapt-apps",
      project: process.env.VITE_PUBLIC_APP_ID,
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ],
  build: {
    target: 'esnext',
    sourcemap: true
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['drizzle-orm']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Ensure ESM transform for test files
    deps: {
      inline: [
        '@testing-library/react',
        'react-router-dom'
      ]
    },
    // Add resolver for test module paths
    resolver: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }
});