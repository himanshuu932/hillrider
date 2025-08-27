import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, School, UserPlus, BarChart2, Award, Settings as SettingsIcon, RefreshCw } from 'lucide-react';
import AddSchool from './AddSchool';
import AdminStudentRegistration from './AdminStudentRegistration';
import RegistrationDashboard from './RegistrationDashboard';
import VerifyRegistrations from './VerifyRegistrations';
import axios from "axios";
import "./AdminRegister.css";
import Settings from './Settings';

const POLLING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- START: MODIFIED DATA FETCHING LOGIC ---

  // useCallback ensures the function isn't recreated on every render
  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://hillrider.onrender.com/api/students');
      setRegistrations(res.data);
      setError(''); // Clear previous errors
    } catch (err) {
      setError("Failed to fetch registration data.");
      console.error("Error fetching registrations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and polling setup
  useEffect(() => {
    // Redirect to login if not authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }

    fetchRegistrations(); // Initial data fetch

    // Setup polling every 10 minutes
    const intervalId = setInterval(fetchRegistrations, POLLING_INTERVAL);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [navigate, fetchRegistrations]);

  // --- END: MODIFIED DATA FETCHING LOGIC ---


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hillrider.onrender.com/api/admin/register",
        formData
      );
      alert("Registration successful!");
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      alert("Error registering admin. Please try again.");
      console.error(err);
    }
  };

 

  const navLinks = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'verify', label: 'Verify Registrations', icon: Users },
    { id: 'addSchool', label: 'Add School', icon: School },
    { id: 'registerStudent', label: 'Register Student', icon: UserPlus },
    { id: 'AddAdmin', label: 'Add Admin', icon: UserPlus },
    { id: 'results', label: 'Results', icon: Award },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    if (loading) return <p className="text-center p-10">Loading data...</p>;
    if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
    
    switch (activeTab) {
      case 'registrations':
        return <RegistrationDashboard 
                  registrationsData={registrations} 
                  onDataChange={fetchRegistrations} 
               />;
      case 'verify':
        // Filter the data here and pass it down
        const unverified = registrations.filter(reg => reg.paymentStatus === 'Unverified');
        return <VerifyRegistrations 
                  unverifiedRegistrations={unverified} 
                  onVerificationSuccess={fetchRegistrations} 
               />;
      case 'addSchool':
        return <AddSchool />;
      case 'registerStudent':
        return <AdminStudentRegistration />;
     case 'AddAdmin':
         case 'AddAdmin':
        return (
            <div className="register-container">
              <form className="register-form" onSubmit={handleSubmit}>
                <h2>Admin Registration</h2>
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />
                <button type="submit">Register</button>
              </form>
            </div>
        );
     case 'results':
        return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Results Management</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-4">Publish and manage Olympiad results for different subjects and classes.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Publish Mathematics Results</button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">Publish Science Results</button>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">Publish English Results</button>
                </div>
              </div>
            </div>
        );
       case 'settings':
        return <Settings />;
      default:
        return <RegistrationDashboard 
                  registrationsData={registrations} 
                  onDataChange={fetchRegistrations} 
               />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with refresh button */}
          <div className="flex justify-between items-center py-2 md:hidden">
              <h2 className="text-lg font-bold">Admin Menu</h2>
              <button
                onClick={fetchRegistrations}
                disabled={loading}
                className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
          </div>
          <div className="md:hidden">
            <select
              aria-label="Select a tab"
              className="w-full form-select block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {navLinks.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
          <nav className="hidden md:flex md:justify-between md:items-center">
            <div className="flex space-x-8">
                {navLinks.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{label}</span>
                </button>
                ))}
            </div>
            <button
                onClick={fetchRegistrations}
                disabled={loading}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;