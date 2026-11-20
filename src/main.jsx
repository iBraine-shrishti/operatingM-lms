import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initServiceWorker } from './utils/desktopNotification';

// Register Service Worker for WhatsApp-style desktop push popups
initServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <App />
  </React.StrictMode>);
