import '@testing-library/jest-dom';

// Mock window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {
      return true;
    },
  };
};

// Mock window.progressierAppRuntimeSettings
window.progressierAppRuntimeSettings = {
  uid: 'test-app-id',
  icon512: 'test-icon-url',
  name: 'Football Subs',
  shortName: 'Football Sub'
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock environment variables
process.env.VITE_PUBLIC_APP_ID = 'test-app-id';
process.env.VITE_PUBLIC_SENTRY_DSN = 'test-sentry-dsn';
process.env.VITE_PUBLIC_APP_ENV = 'test';