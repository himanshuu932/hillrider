import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Users, Search, CheckCircle, Clock, Printer } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Reusable component for KPI cards
const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <Icon className="h-8 w-8 text-gray-400" />
        </div>
    </div>
);

const RegistrationDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for managing filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterSchool, setFilterSchool] = useState('All');
    const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'custom'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    // Fetch registration data from the backend
    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/students');
                setRegistrations(res.data);
            } catch (err) {
                setError('Failed to fetch registration data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, []);

    // Memoized array for "valid" registrations (Paid or Offline Paid) used for analytics
    const validRegistrations = useMemo(() => {
        return registrations.filter(
            reg => reg.paymentStatus === 'Paid' || reg.paymentStatus === 'Offline Paid'
        );
    }, [registrations]);

    // Memoized array for the table, which filters ALL registrations with new date logic
    const filteredRegistrationsForTable = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

        return registrations.filter(reg => {
            const fullName = `${reg.firstName} ${reg.lastName}`.toLowerCase();
            const schoolName = reg.school?.name?.toLowerCase() || '';

            const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                                  schoolName.includes(searchTerm.toLowerCase());
            
            const matchesStatus = filterStatus === 'All' || reg.paymentStatus === filterStatus;
            const matchesSchool = filterSchool === 'All' || reg.school?._id === filterSchool;

            // Date Filtering Logic
            let matchesDate = true;
            const regDate = new Date(reg.createdAt);
            regDate.setHours(0, 0, 0, 0);

            if (dateFilter === 'today') {
                matchesDate = regDate.getTime() === today.getTime();
            } else if (dateFilter === 'custom' && startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(0, 0, 0, 0);
                matchesDate = regDate >= start && regDate <= end;
            }

            return matchesSearch && matchesStatus && matchesSchool && matchesDate;
        });
    }, [registrations, searchTerm, filterStatus, filterSchool, dateFilter, startDate, endDate]);

    // KPIs based on the correct data sets
    const kpis = useMemo(() => {
        const totalValid = validRegistrations.length;
        const paid = validRegistrations.filter(r => r.paymentStatus === 'Paid').length;
        const offline = validRegistrations.filter(r => r.paymentStatus === 'Offline Paid').length;
        const pending = registrations.filter(r => r.paymentStatus === 'Unverified').length;
        return { totalValid, paid, offline, pending };
    }, [registrations, validRegistrations]);

    // Get a list of unique schools for the filter dropdown
    const uniqueSchools = useMemo(() => {
        const schoolMap = new Map();
        registrations.forEach(reg => {
            if (reg.school) {
                schoolMap.set(reg.school._id, reg.school.name);
            }
        });
        return Array.from(schoolMap, ([id, name]) => ({ id, name }));
    }, [registrations]);

    // Data for the Pie Chart (based on valid registrations)
    const pieChartData = {
        labels: ['Online (Paid)', 'Offline (Paid)'],
        datasets: [{
            data: [kpis.paid, kpis.offline],
            backgroundColor: ['#22C55E', '#3B82F6'],
            borderColor: '#FFFFFF',
        }],
    };

    // Data for the Bar Chart (based on valid registrations)
    const registrationsBySchool = useMemo(() => {
        const counts = {};
        validRegistrations.forEach(reg => {
            const schoolName = reg.school?.name || 'Unknown School';
            counts[schoolName] = (counts[schoolName] || 0) + 1;
        });
        return counts;
    }, [validRegistrations]);

    const barChartData = {
        labels: Object.keys(registrationsBySchool),
        datasets: [{
            label: '# of Valid Registrations',
            data: Object.values(registrationsBySchool),
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
        }],
    };
    
    // Print handler
    const handlePrint = () => {
        alert('Printing...');
        // In a real application, you would use window.print() or a library like react-to-print
    };

    if (loading) return <p className="text-center p-10">Loading dashboard...</p>;
    if (error) return <p className="text-center p-10 text-red-500">{error}</p>;

    return (
        <div className="space-y-8 p-4 md:p-6">
            <h2 className="text-3xl font-bold text-gray-800">Registrations Dashboard</h2>

            {/* Section 1: KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Valid Registrations" value={kpis.totalValid} icon={Users} color="border-blue-500" />
                <StatCard title="Online (Paid)" value={kpis.paid} icon={CheckCircle} color="border-green-500" />
                <StatCard title="Offline (Paid)" value={kpis.offline} icon={Users} color="border-gray-500" />
                <StatCard title="Pending Verification" value={kpis.pending} icon={Clock} color="border-yellow-500" />
            </div>

            {/* Section 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Valid Registration Types</h3>
                    <Pie data={pieChartData} />
                </div>
                <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Valid Registrations by School</h3>
                    <Bar data={barChartData} options={{ responsive: true }} />
                </div>
            </div>

            {/* Section 3: Filters and Full Student List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">All Student Entries</h3>
                    <button onClick={handlePrint} className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
                        <Printer className="h-5 w-5" />
                        <span>Print List</span>
                    </button>
                </div>
                {/* Filter Controls */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input type="text" placeholder="Search by name or school..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full p-3 border rounded-md bg-gray-50" />
                        </div>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-3 border rounded-md bg-gray-50">
                            <option value="All">All Statuses</option>
                            <option value="Paid">Online (Paid)</option>
                            <option value="Unverified">Unverified</option>
                            <option value="Offline Paid">Offline (Paid)</option>
                        </select>
                        <select value={filterSchool} onChange={e => setFilterSchool(e.target.value)} className="p-3 border rounded-md bg-gray-50">
                            <option value="All">All Schools</option>
                            {uniqueSchools.map(school => (
                                <option key={school.id} value={school.id}>{school.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="p-3 border rounded-md bg-gray-50">
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="custom">Custom Range</option>
                        </select>
                        {dateFilter === 'custom' && (
                            <>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-3 border rounded-md bg-gray-50"/>
                                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-3 border rounded-md bg-gray-50"/>
                            </>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered On</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRegistrationsForTable.length > 0 ? filteredRegistrationsForTable.map(reg => (
                                <tr key={reg._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{reg.firstName} {reg.lastName}</div>
                                        <div className="text-sm text-gray-500">{reg.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{reg.school?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            reg.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                                            reg.paymentStatus === 'Unverified' ? 'bg-yellow-100 text-yellow-800' :
                                            reg.paymentStatus === 'Offline Paid' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {reg.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">No matching registrations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDashboard;
