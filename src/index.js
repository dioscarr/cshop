import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DatabaseProvider } from './contexts/DatabaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </React.StrictMode>
);
