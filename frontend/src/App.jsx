import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Pages/LandingPage"; // Adjust path if needed
import LoginPage from "./components/Pages/LoginPage"; // Adjust path if needed
import ProfilePage from "./components/Pages/ProfilePage"; // Adjust path if needed
import SignupPage from "./components/Pages/SignupPage"; // Adjust path if needed
import Home from "./components/Pages/HomePage"; // Adjust path if needed
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


import "./App.css";
import { LanguageProvider } from './context/LanguageContext';
import "./index.css";

function App() {
  return (
    <LanguageProvider>
      <div>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
          <Route path="/home" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
          <Route path="/signup" element={<SignupPage />} /> {/* Signup Page */}
          <Route path="/profile" element={<ProfilePage />} /> Signup Page
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;