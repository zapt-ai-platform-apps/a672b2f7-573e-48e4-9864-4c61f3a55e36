import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID,
    },
  },
});

// Add PWA support to the app (this will add a service worker and a manifest file, you don't need to do anything else)
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512:
    'https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=512&height=512',
  name: 'Football Subs',
  shortName: 'Football Subs',
};
let script = document.createElement('script');
script.setAttribute(
  'src',
  'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js'
);
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')
);