import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from "@sentry/vite-plugin";
import MagicString from 'magic-string';

// Custom plugin to remove "use client" directives from react-toastify
function removeUseClient() {
  return {
    name: 'remove-use-client',
    transform(code, id) {
      if (id.includes('react-toastify') && code.includes('"use client"')) {
        const directive = '"use client";';
        const index = code.indexOf(directive);
        if (index !== -1) {
          const s = new MagicString(code);
          s.remove(index, index + directive.length);
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          };
        }
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    removeUseClient(),
    sentryVitePlugin({
      org: "zapt-apps",
      project: process.env.VITE_PUBLIC_APP_ID,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    sourcemap: true
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  optimizeDeps: {
    exclude: ['drizzle-orm']
  }
});