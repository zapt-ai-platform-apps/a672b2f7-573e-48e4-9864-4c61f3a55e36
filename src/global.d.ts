// Add type definitions for environment variables and global objects
interface ImportMeta {
  env: {
    VITE_PUBLIC_SENTRY_DSN: string;
    VITE_PUBLIC_APP_ID: string;
    VITE_PUBLIC_APP_ENV: string;
    VITE_PUBLIC_UMAMI_WEBSITE_ID: string;
    [key: string]: string;
  };
}

interface Window {
  progressierAppRuntimeSettings: {
    uid: string;
    icon512: string;
    name: string;
    shortName: string;
  };
}

// Add any other global type definitions here