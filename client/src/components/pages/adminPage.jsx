import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Save, X, Users, DollarSign, Download, School, UserPlus } from 'lucide-react';
import AddSchool from './AddSchool'; // Import the component
import AdminStudentRegistration from './AdminStudentRegistration'; // Import the component
import RegistrationDashboard from './RegistrationDashboard';
import VerifyRegistrations from './VerifyRegistrations';
const mockRegistrations = [
  // ... (mock data remains the same)
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
      navigate('/login');
    }
  }, [navigate]);

  const stats = useMemo(() => {
    // ... (stats logic remains the same)
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    // ... (filtering logic remains the same)
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

              { id: 'results', label: 'Results' },
              { id: 'settings', label: 'Settings'}
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
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
           <RegistrationDashboard/>
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
          <div>
            {/* ... Statistics JSX ... */}
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            {/* ... Results JSX ... */}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            {/* ... Settings JSX ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
