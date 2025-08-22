import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    pressrelease: "PRESS RELEASE",
    volunteer: "VOLUNTEER",
    admin: "ADMIN"
  },
  hi: {
    logo: "हिल राइडर्स",
    mnvss: "मानव सेवा समिति",
    home: "होम",
    aboutus: "हमारे बारे में",
    olympiad: "ओलंपियाड",
    activity: "गतिविधियाँ",
    donate: "दान करें",
    pressrelease: "प्रेस विज्ञप्ति",
    volunteer: "स्वयंसेवक",
    admin: "एडमिन"
  },
};

const Navbar = ({ languageType, setLanguageType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const selectedContent = content[languageType] || content.en;

  const getLinkClass = (path) => {
    return location.pathname === path ? "navbar__link active" : "navbar__link";
  };

  return (
    <nav className="navbar">
      {/* Hamburger for mobile view */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
      <ul className={`navbar__menu ${isMenuOpen ? "show" : ""}`}>
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
        <li className="navbar__item">
          <Link to="/pressrelease" className={getLinkClass("/pressrelease")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.pressrelease}
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/volunteer" className={getLinkClass("/volunteer")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.volunteer}
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/admin" className={getLinkClass("/admin")} onClick={() => setIsMenuOpen(false)}>
            {selectedContent.admin}
          </Link>
        </li>
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