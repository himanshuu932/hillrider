// Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios
import logo from "../assets/nobgmainlogo.png";
import "../components/styles/navbar.css";
import { HashLink } from "react-router-hash-link";

const content = {
  en: {
    logo: "HILL RIDERS",
    mnvss: "Manav Seva Samiti",
    home: "HOME",
    aboutus: "ABOUT US",
    olympiad: "OLYMPIAD",
    activity: "ACTIVITY",
    donate: "DONATE",
    logout: "LOGOUT",
    // pressrelease: "PRESS RELEASE",
    // volunteer: "VOLUNTEER",
  },
  hi: {
    logo: "हिल राइडर्स",
    mnvss: "मानव सेवा समिति",
    home: "होम",
    aboutus: "हमारे बारे में",
    olympiad: "ओलंपियाड",
    activity: "गतिविधियाँ",
    donate: "दान करें",
    logout: "लॉग आउट",
    // pressrelease: "प्रेस विज्ञप्ति",
    // volunteer: "स्वयंसेवक",
  },
};

// Accept isAdmin and setIsAdmin as props
const Navbar = ({ languageType, setLanguageType, isAdmin, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const selectedContent = content[languageType] || content.en;
  const navigate = useNavigate(); // Hook for navigation

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const getLinkClass = (path) => {
    return location.pathname === path ? "navbar__link active" : "navbar__link";
  };

  // Function to handle the logout API call and state update
  const handleLogout = async () => {
    try {
      await axios.post('https://hillrider.onrender.com/api/admin/logout', {}, {
        withCredentials: true,
      });
      setIsAdmin(false); // Update the state in App.js
      setIsMenuOpen(false); // Close the mobile menu
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
      // You can add user feedback here, e.g., an alert
    }
  };


  return (
    <nav className="navbar">
      {/* Hamburger for mobile view */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} ref={hamburgerRef}>
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Logo Section */}
      <div className="navbar__logo">
        <img src={logo} alt="logo" />
        <div className="logo-text">
          {selectedContent.logo}
          <span className="mnvss">{selectedContent.mnvss}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className={`navbar__menu ${isMenuOpen ? "show" : ""}`} ref={menuRef}>
        <li className="navbar__item">
          <Link to="/" className={getLinkClass("/")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.home}
          </Link>
        </li>
        <li className="navbar__item">
          <HashLink smooth to="/#about" className={getLinkClass("/aboutus")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.aboutus}
          </HashLink>
        </li>
        <li className="navbar__item">
          <Link to="/olympiad" className={getLinkClass("/olympiad")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.olympiad}
          </Link>
        </li>
        <li className="navbar__item">
          <HashLink smooth to="/#activities" className={getLinkClass("/activity")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.activity}
          </HashLink>
        </li>
        <li className="navbar__item">
          <Link to="/donate" className={getLinkClass("/donate")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.donate}
          </Link>
        </li>
         {/* <li className="navbar__item">
          <Link to="/pressrelease" className={getLinkClass("/pressrelease")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.pressrelease}
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/volunteer" className={getLinkClass("/volunteer")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.volunteer}
          </Link>
        </li> */}
        
        {/* Conditionally rendered Logout button */}
        {isAdmin && (
          <li className="navbar__item">
            <button onClick={handleLogout} className="navbar__link logout-button">
              {selectedContent.logout}
            </button>
          </li>
        )}
      </ul>

      {/* Language Switch Buttons */}
      <div className="lang-toggle">
        <span
          className={languageType === "hi" ? "active" : ""}
          onClick={() => setLanguageType("hi")}
        >
          अ
        </span>
        /
        <span
          className={languageType === "en" ? "active" : ""}
          onClick={() => setLanguageType("en")}
        >
          A
        </span>
      </div>
    </nav>
  );
};

export default Navbar;