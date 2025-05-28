// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Ensure this file exists

// Page Components
import Landing from './module/pages/Landing';
import Login from './module/pages/Login'; // Uncomment if Login is a separate page
import Registration from './module/pages/Registration';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Module paths */}
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} /> {/* Assuming Login is part of Landing for now */}
        <Route path='/register' element={<Registration />} /> {/* Assuming Registration is part of Login for now */}
         {/* For potential auth redirect */}

        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;