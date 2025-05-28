// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file exists
import App from './App';
import reportWebVitals from './reportWebVitals';
// If you are using AOS (Animate on Scroll) library as hinted by data-aos attribute:
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // Import AOS styles

// AOS.init(); // Initialize AOS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();