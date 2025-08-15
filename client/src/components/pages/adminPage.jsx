import React, { useState, useMemo } from 'react';
import { Search, Edit, Save, X, Users, DollarSign, Download } from 'lucide-react';

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
        <h1 className="text-2xl font-bold"> Admin Panel</h1>
        <p className="text-blue-200 mt-1">Manage registrations, payments, and results</p>
      </div>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'registrations', label: 'Registrations' },
              { id: 'statistics', label: 'Statistics' },
              { id: 'results', label: 'Results' },
              { id: 'settings', label: 'Settings'}
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'registrations' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Registrations" value={stats.totalRegistrations} icon={Users} color="#ffffffff" />
              <StatCard title="Paid" value={stats.paidCount} icon={DollarSign} color="#ffffffff" />
              <StatCard title="Pending" value={stats.pendingCount} icon={DollarSign} color="#f2f2f2ff" />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, school..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>

                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                </select>

                <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            {editingId === reg.id ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editData.firstName || ''}
                                  onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                                  className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
                                />
                                <input
                                  type="text"
                                  value={editData.lastName || ''}
                                  onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                                  className="text-sm text-gray-500 border rounded px-2 py-1"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="text-sm font-medium text-gray-900">{reg.firstName} {reg.lastName}</div>
                                <div className="text-sm text-gray-500">Age: {reg.age}</div>
                              </div>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === reg.id ? (
                            <input
                              type="text"
                              value={editData.phone || ''}
                              onChange={(e) => setEditData({...editData, phone: e.target.value})}
                              className="text-sm text-gray-900 border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            <div className="text-sm text-gray-900">{reg.phone}</div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            {editingId === reg.id ? (
                              <div className="space-y-2">
                                <select
                                  value={editData.class || ''}
                                  onChange={(e) => setEditData({...editData, class: e.target.value})}
                                  className="text-sm border rounded px-2 py-1"
                                >
                                  <option value="7th">7th</option>
                                  <option value="8th">8th</option>
                                  <option value="9th">9th</option>
                                  <option value="10th">10th</option>
                                  <option value="11th">11th</option>
                                  <option value="12th">12th</option>
                                </select>
                                <input
                                  type="text"
                                  value={editData.school || ''}
                                  onChange={(e) => setEditData({...editData, school: e.target.value})}
                                  className="text-sm border rounded px-2 py-1 w-full"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="text-sm font-medium text-gray-900">Class {reg.class}</div>
                                <div className="text-sm text-gray-500">{reg.school}</div>
                              </div>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === reg.id ? (
                            <select
                              value={editData.subject || ''}
                              onChange={(e) => setEditData({...editData, subject: e.target.value})}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="Mathematics">Mathematics</option>
                              <option value="Science">Science</option>
                              <option value="English">English</option>
                            </select>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {reg.subject}
                            </span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <select
                              value={reg.paymentStatus}
                              onChange={(e) => updatePaymentStatus(reg.id, e.target.value)}
                              className={`text-xs font-semibold rounded-full px-2 py-1 ${
                                reg.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                                reg.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              <option value="Paid">Paid</option>
                              <option value="Pending">Pending</option>
                              <option value="Failed">Failed</option>
                            </select>
                            <span className="text-xs text-gray-500">₹{reg.amount}</span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingId === reg.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSave}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Save className="h-5 w-5" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(reg.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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