
import './App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./components/pages/AdminRegister";
import AdminLogin from "./components/pages/AdminLogin";

import Footer from './components/Footer';
import React, { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [languageType, setLanguageType] = useState("en");
  return (
   
    <Router>
      <Navbar languageType={languageType} setLanguageType={setLanguageType} />
       
      <Routes>
         
        <Route path="/" element={<LandingPage languageType={languageType} />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </Router>
   
  );
}

export default App;
