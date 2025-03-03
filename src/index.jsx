import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@/app/App';
import '@/index.css';
import * as Sentry from '@sentry/browser';
import { inject } from '@vercel/analytics';
import LogRocket from 'logrocket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from '@/app/context/AppProvider';

LogRocket.init('p29zbk/zapt');

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

// Vercel Analytics
inject();

// Add Umami Analytics script conditionally
if (import.meta.env.VITE_PUBLIC_APP_ENV !== 'development') {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}

// Add PWA support to the app
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512:
    'https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=512&height=512',
  name: 'Football Subs',
  shortName: 'Football Subs'
};

const progressierScript = document.createElement('script');
progressierScript.src = 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js';
progressierScript.defer = true;
document.querySelector('head').appendChild(progressierScript);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </AppProvider>
  </React.StrictMode>
);