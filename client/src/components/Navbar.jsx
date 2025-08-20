import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nobgmainlogo.png";
import "../components/styles/navbar.css";

{/*}
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(); 
                localStorage.setItem('firebaseToken', token);
                setCurrentUser(true);
            } else {
                localStorage.removeItem('firebaseToken');
                setCurrentUser(false);
            }
        });

        return () => unsubscribe();
    }, []);
*/}
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
  },
};

const Navbar = ({ languageType, setLanguageType }) => {
  const selectedContent = content[languageType] || content.en;
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <nav className="nav">
      {/*Hamburger for mobile view*/}
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
        <div className="logo-text">
          {selectedContent.logo}
          <span className="mnvss">{selectedContent.mnvss}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li><Link to="/">{selectedContent.home}</Link></li>
        <li><Link to="/aboutus">{selectedContent.aboutus}</Link></li>
        <li><Link to="/olympiad">{selectedContent.olympiad}</Link></li>
        <li><Link to="/activity">{selectedContent.activity}</Link></li>
        <li><Link to="/donate">{selectedContent.donate}</Link></li>
        <li><Link to="/pressrelease">{selectedContent.pressrelease}</Link></li>
        <li><Link to="/volunteer">{selectedContent.volunteer}</Link></li>
          <li><Link to="/admin" class="hover:text-blue-400">admin</Link></li>
    </ul>

      {/* Language Switch Buttons */}
      <div className="buttons">
        <button
          className={`btn ${languageType === "hi" ? "active-btn" : ""}`}
          onClick={() => setLanguageType("hi")}
        >
           अ 
        </button>/
         <button
          className={`btn ${languageType === "en" ? "active-btn" : ""}`}
          onClick={() => setLanguageType("en")}
        >
           A 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
