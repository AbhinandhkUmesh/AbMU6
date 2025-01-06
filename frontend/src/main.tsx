// Importing dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Include global styles

// Find the root element
const container = document.getElementById('root');
if (!container) {
  throw new Error("Root element not found");
}

// Render the application
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
