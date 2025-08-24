import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Save, X, Users, DollarSign, Download, School, UserPlus } from 'lucide-react';
import AddSchool from './AddSchool'; // Import the component
import AdminStudentRegistration from './AdminStudentRegistration'; // Import the component
import RegistrationDashboard from './RegistrationDashboard';
import VerifyRegistrations from './VerifyRegistrations';
import axios from "axios";
import "./AdminRegister.css";

const mockRegistrations = [
  { id: 1, firstName: 'Rahul', lastName: 'Sharma', age: 14, class: '9th', phone: '9876543210', school: 'Delhi Public School', subject: 'Mathematics', paymentStatus: 'Paid', amount: 500, registrationDate: '2025-01-15' },
  { id: 2, firstName: 'Priya', lastName: 'Patel', age: 15, class: '10th', phone: '9876543211', school: 'Kendriya Vidyalaya', subject: 'Science', paymentStatus: 'Pending', amount: 500, registrationDate: '2025-01-16' },
  { id: 3, firstName: 'Arjun', lastName: 'Kumar', age: 13, class: '8th', phone: '9876543212', school: 'St. Marys School', subject: 'English', paymentStatus: 'Paid', amount: 500, registrationDate: '2025-01-17' },
  { id: 4, firstName: 'Sneha', lastName: 'Singh', age: 16, class: '11th', phone: '9876543213', school: 'Modern School', subject: 'Mathematics', paymentStatus: 'Failed', amount: 500, registrationDate: '2025-01-18' },
  { id: 5, firstName: 'Vikram', lastName: 'Rao', age: 14, class: '9th', phone: '9876543214', school: 'Delhi Public School', subject: 'Science', paymentStatus: 'Paid', amount: 500, registrationDate: '2025-01-19' },
  { id: 6, firstName: 'Anita', lastName: 'Gupta', age: 12, class: '7th', phone: '9876543215', school: 'Bal Bharati Public School', subject: 'Mathematics', paymentStatus: 'Pending', amount: 500, registrationDate: '2025-01-20' },
  { id: 7, firstName: 'Rohit', lastName: 'Verma', age: 15, class: '10th', phone: '9876543216', school: 'Ryan International', subject: 'English', paymentStatus: 'Paid', amount: 500, registrationDate: '2025-01-21' },
  { id: 8, firstName: 'Kavya', lastName: 'Nair', age: 13, class: '8th', phone: '9876543217', school: 'Kendriya Vidyalaya', subject: 'Science', paymentStatus: 'Paid', amount: 500, registrationDate: '2025-01-22' }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//will add admin auth for this
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
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

  const stats = useMemo(() => {
    const totalRegistrations = registrations.length;
    const paidCount = registrations.filter(r => r.paymentStatus === 'Paid').length;
    const pendingCount = registrations.filter(r => r.paymentStatus === 'Pending').length;
    const failedCount = registrations.filter(r => r.paymentStatus === 'Failed').length;
    const totalRevenue = registrations.filter(r => r.paymentStatus === 'Paid').reduce((sum, r) => sum + r.amount, 0);

    return { totalRegistrations, paidCount, pendingCount, failedCount, totalRevenue };

  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      const matchesSearch =
        reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phone.includes(searchTerm) ||
        reg.school.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'All' || reg.paymentStatus === filterStatus;
      const matchesSubject = filterSubject === 'All' || reg.subject === filterSubject;

      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [registrations, searchTerm, filterStatus, filterSubject]);

  // ... (handler functions like handleEdit, handleSave, etc. remain the same)
  const handleEdit = (id) => {
    const reg = registrations.find(r => r.id === id);
    setEditingId(id);
    setEditData(reg);
  };

  const handleSave = () => {
    setRegistrations(prev => prev.map(reg =>
      reg.id === editingId ? { ...reg, ...editData } : reg
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const updatePaymentStatus = (id, status) => {
    setRegistrations(prev => prev.map(reg =>
      reg.id === id ? { ...reg, paymentStatus: status } : reg
    ));
  };


  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-blue-200 mt-1">Manage registrations, payments, and results</p>
      </div>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'registrations', label: 'Registrations', icon: Users },
              { id: 'verify', label: 'Verify Registrations', icon: Users },
              { id: 'addSchool', label: 'Add School', icon: School },
              { id: 'registerStudent', label: 'Register Student', icon: UserPlus },
              { id: 'statistics', label: 'Statistics' },
              { id: 'AddAdmin', label: 'Add Admin', icon: Users },
              { id: 'results', label: 'Results' },
              { id: 'settings', label: 'Settings' },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'registrations' && (
          <div>
            <RegistrationDashboard />
          </div>
        )}
        {activeTab === 'verify' && (
          <div>
            <VerifyRegistrations />
          </div>
        )}
        {activeTab === 'addSchool' && (
          <AddSchool />
        )}

        {activeTab === 'registerStudent' && (
          <AdminStudentRegistration />
        )}

        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Statistics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration by Subject</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Mathematics</span>
                    <span className="font-semibold">{registrations.filter(r => r.subject === 'Mathematics').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Science</span>
                    <span className="font-semibold">{registrations.filter(r => r.subject === 'Science').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>English</span>
                    <span className="font-semibold">{registrations.filter(r => r.subject === 'English').length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration by Class</h3>
                <div className="space-y-2">
                  {['7th', '8th', '9th', '10th', '11th', '12th'].map(cls => (
                    <div key={cls} className="flex justify-between">
                      <span>Class {cls}</span>
                      <span className="font-semibold">{registrations.filter(r => r.class === cls).length}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-green-600">
                    <span>Total Collected</span>
                    <span className="font-semibold">₹{stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-yellow-600">
                    <span>Pending Amount</span>
                    <span className="font-semibold">₹{(stats.pendingCount * 500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Failed Payments</span>
                    <span className="font-semibold">₹{(stats.failedCount * 500).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'AddAdmin' && (
          <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
              <h2>Admin Registration</h2>

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />

              <button type="submit">Register</button>
            </form>
          </div>
        )}


        {activeTab === 'results' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Results Management</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">Publish and manage Olympiad results for different subjects and classes.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Publish Mathematics Results
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Publish Science Results
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Publish English Results
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee</label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
