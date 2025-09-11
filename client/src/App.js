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
  const [minimumDelayElapsed, setMinimumDelayElapsed] = useState(false);

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        await axios.get('http://localhost:5000/api/admin/verify-token', {
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

    // Start a timer to ensure loader stays at least 5 seconds
    const timer = setTimeout(() => {
      setMinimumDelayElapsed(true);
    }, 3000); // 5000 ms = 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Loader stays while either isLoading or minimumDelayElapsed is false
  if (isLoading || !minimumDelayElapsed) {
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
        <Route path="/" element={<LandingPage languageType={languageType} />} />
        <Route 
          path="/login" 
          element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin setIsAdmin={setIsAdmin} />} 
        />
        <Route path="/olympiad" element={<Olympiad languageType={languageType} />} />
        <Route path="/pressrelease" element={<PressRelease languageType={languageType} />} />
        <Route path="/registration" element={<Registration languageType={languageType} />} />
        <Route path="/donate" element={<DonationPage languageType={languageType} />} />
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
