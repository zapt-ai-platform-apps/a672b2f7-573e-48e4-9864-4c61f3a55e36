/// <reference types="vitest/globals" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_APP_ID: string;
  readonly VITE_PUBLIC_APP_ENV: string;
  readonly VITE_PUBLIC_SENTRY_DSN: string;
  readonly VITE_PUBLIC_UMAMI_WEBSITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  progressierAppRuntimeSettings: {
    uid: string;
    icon512: string;
    name: string;
    shortName: string;
  };
}