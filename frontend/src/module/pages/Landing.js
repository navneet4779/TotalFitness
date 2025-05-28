// src/module/pages/Landing.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../components/MainNavBar.js'; // This is the import we are debugging

// Firebase or other auth imports (if needed and configured)
// import { onAuthStateChanged } from 'firebase/auth';
// import { Authentication } from '../../firebase-config'; // Example path

export default function Landing() { // Assuming this is the correct component name for this file
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen'>
      <MainNavBar />
      {/* Add other landing page content here */}
    </div>
  );
}