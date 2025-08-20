import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Component Imports
import LandingPage from './components/LandingPage';
import AdminRegister from "./components/pages/AdminRegister";
import AdminLogin from "./components/pages/AdminLogin";
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import AdminPanel from './components/pages/adminPage';
import Olympiad from './components/Olympiad';
import Registration from './components/OlyRegistration';
import AdminStudentRegistration from './components/pages/AdminStudentRegistration'; // Import the new component
import DonationPage from './components/DonationPage';

// A wrapper to protect routes that require admin authentication
const PrivateRoute = ({ children, isAdmin }) => {
  return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  const [languageType, setLanguageType] = useState("en");
  // State to track if an admin is logged in
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin token in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <Navbar languageType={languageType} setLanguageType={setLanguageType} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage languageType={languageType} />} />
        <Route path="/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/olympiad" element={<Olympiad languageType={languageType} />} />
        <Route path="/pressrelease" element={<Registration languageType={languageType} />} />
        <Route path="/donate" element={<DonationPage languageType={languageType} />} />
        {/* Admin-only Routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute isAdmin={isAdmin}>
              <AdminPanel />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/register-student" 
          element={
            <PrivateRoute isAdmin={isAdmin}>
              <AdminStudentRegistration />
            </PrivateRoute>
          } 
        />
        {/* You might want to protect this route as well */}
        <Route path="/register" element={<AdminRegister />} />
      </Routes>
      <Footer languageType={languageType} />
    </Router>
  );
}

export default App;
