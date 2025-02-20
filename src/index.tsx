import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (import.meta.env.VITE_PUBLIC_APP_ENV !== 'development') {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.ts';
  script.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);