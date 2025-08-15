// import logo from './logo.svg';
// import './App.css';
// import LandingPage from './components/LandingPage';

// function App() {
//   return (
//     <div className="App">
//      <LandingPage/>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  const [languageType, setLanguageType] = useState("en");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar languageType={languageType} setLanguageType={setLanguageType} />
        <Routes>
          <Route path="/" element={<LandingPage languageType={languageType} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
