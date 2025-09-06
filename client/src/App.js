// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import LandingPage from './components/LandingPage';
import AdminRegister from "./components/pages/AdminRegister";
import AdminLogin from "./components/pages/AdminLogin";
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import AdminPanel from './components/pages/adminPage';
import Olympiad from './components/olympiad/Olympiad';
import Registration from './components/olympiad/OlyRegistration';
import AdminStudentRegistration from './components/pages/AdminStudentRegistration';
import DonationPage from './components/DonationPage';
import PressRelease from './components/PressRelease';
import Loader from './Loader';

const PrivateRoute = ({ children, isAdmin }) => {
  return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  const [languageType, setLanguageType] = useState("en");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        await axios.get('https://hillrider.onrender.com/api/admin/verify-token', {
          withCredentials: true 
        });
        setIsAdmin(true);
      } catch (error) {
        console.log("Admin not authenticated or session expired.");
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAdminSession();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Navbar 
        languageType={languageType} 
        setLanguageType={setLanguageType}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin} 
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage languageType={languageType} />} />
        
        {/* If admin is logged in, redirect from /login to /admin */}
        <Route 
          path="/login" 
          element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin setIsAdmin={setIsAdmin} />} 
        />

        <Route path="/olympiad" element={<Olympiad languageType={languageType} />} />
        <Route path="/pressrelease" element={<PressRelease languageType={languageType} />} />
        <Route path="/registration" element={<Registration languageType={languageType} />} />
        <Route path="/donate" element={<DonationPage languageType={languageType} />} />
        
        {/* Private Admin Routes */}
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
        <Route path="/register" element={
            <PrivateRoute isAdmin={isAdmin}>
                <AdminRegister />
            </PrivateRoute>
        } />
      </Routes>
      <Footer languageType={languageType} />
    </Router>
  );
}

export default App;