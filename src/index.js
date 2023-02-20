import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App'
import Generate3DModel from './components/three';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    < App />
    {/* < Generate3DModel /> */}
  </React.StrictMode>
);
reportWebVitals();
