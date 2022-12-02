import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

Sentry.init({
  dsn: "https://7df1697275f44d0e9da7941c37a6ed68@o1385316.ingest.sentry.io/6705069",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
