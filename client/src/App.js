import './App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./components/pages/AdminRegister";
import AdminLogin from "./components/pages/AdminLogin";

function App() {
  const [languageType, setLanguageType] = useState("en");
  return (
    // <div className="App">
    //  <LandingPage/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
