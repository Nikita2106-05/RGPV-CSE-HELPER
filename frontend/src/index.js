// frontend/src/main.jsx (if using Vite) or index.js (if using Create React App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Ensure this path is correct
import './index.css'; // This will contain your TailwindCSS imports

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);