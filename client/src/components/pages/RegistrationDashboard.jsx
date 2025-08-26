import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Users, Search, CheckCircle, Clock, Printer, Edit, Trash2, FileText, Save, X } from 'lucide-react';
import ReactPaginate from 'react-paginate';

// Import the components for different views
import RegistrationReceipt from '../RegistrationPrint';
import RegistrationListPrint from '../RegistrationListPrint';
import BulkReceiptPrint from '../BulkReceiptPrint';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Reusable component for KPI cards
const StatCard = ({ title, value, icon: Icon, bgColor, iconColor }) => (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4 transition-transform hover:scale-105">
        <div className={`rounded-full p-3 ${bgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const ENTRIES_PER_PAGE = 10;

const RegistrationDashboard = () => {
    // --- STATE MANAGEMENT ---
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [schools, setSchools] = useState([]);

    // Filters State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterSchool, setFilterSchool] = useState('All');
    const [dateFilter, setDateFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Editing State
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    // View Control State
    const [registrationsState, setRegistrationsState] = useState([]);
    const [registeredStudent, setRegisteredStudent] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showPrintList, setShowPrintList] = useState(false);
    const [showBulkReceipts, setShowBulkReceipts] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await axios.get('https://hillrider.onrender.com/api/students');
                setRegistrations(res.data);
                setRegistrationsState(res.data);
            } catch (err) {
                setError('Failed to fetch registration data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, []);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const res = await axios.get('https://hillrider.onrender.com/api/schools');
                setSchools(res.data);
            } catch (err) {
                console.error("Failed to fetch schools", err);
                setError('Could not load school list. Please refresh the page.');
            }
        };
        fetchSchools();
    }, []);

    // --- MEMOIZED COMPUTATIONS ---
    const validRegistrations = useMemo(() => 
        registrations.filter(reg => reg.paymentStatus === 'Paid' || reg.paymentStatus === 'Offline Paid'),
    [registrations]);

    const filteredRegistrationsForTable = useMemo(() => {
        return registrationsState.filter(reg => {
            const regDate = new Date(reg.createdAt);
            regDate.setHours(0, 0, 0, 0);

            // Search filter
            const fullName = `${reg.firstName} ${reg.lastName}`.toLowerCase();
            const schoolName = reg.school?.name?.toLowerCase() || '';
            const phone = reg.phone?.toLowerCase() || '';
            const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || schoolName.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm.toLowerCase());

            // Status and School filters
            const matchesStatus = filterStatus === 'All' || reg.paymentStatus === filterStatus;
            const matchesSchool = filterSchool === 'All' || reg.school?._id === filterSchool;

            // Date filter
            let matchesDate = true;
            if (dateFilter === 'today') {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                matchesDate = regDate.getTime() === today.getTime();
            } else if (dateFilter === 'custom' && startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Include the whole end day
                matchesDate = regDate >= start && regDate <= end;
            }

            return matchesSearch && matchesStatus && matchesSchool && matchesDate;
        });
    }, [registrationsState, searchTerm, filterStatus, filterSchool, dateFilter, startDate, endDate]);

    const kpis = useMemo(() => ({
        totalValid: validRegistrations.length,
        paid: validRegistrations.filter(r => r.paymentStatus === 'Paid').length,
        offline: validRegistrations.filter(r => r.paymentStatus === 'Offline Paid').length,
        pending: registrations.filter(r => r.paymentStatus === 'Unverified').length,
    }), [registrations, validRegistrations]);

    const uniqueSchools = useMemo(() => {
        const schoolMap = new Map();
        registrations.forEach(reg => {
            if (reg.school) schoolMap.set(reg.school._id, reg.school.name);
        });
        return Array.from(schoolMap, ([id, name]) => ({ id, name }));
    }, [registrations]);
    
    // --- CHART DATA ---
    const pieChartData = {
        labels: ['Online (Paid)', 'Offline (Paid)'],
        datasets: [{ data: [kpis.paid, kpis.offline], backgroundColor: ['#10B981', '#3B82F6'], borderColor: '#FFFFFF', borderWidth: 2 }],
    };

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
        datasets: [{ label: 'Valid Registrations', data: Object.values(registrationsBySchool), backgroundColor: 'rgba(59, 130, 246, 0.6)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1, borderRadius: 4 }],
    };
    
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

    // --- HANDLER FUNCTIONS ---
    const handleEdit = (id) => {
        const reg = registrationsState.find(r => r._id === id);
        setEditingId(id);
        setEditData({ ...reg, school: reg.school?._id || '' });
    };

    const handleSave = async (id) => {
        try {
            const res = await axios.put(`https://hillrider.onrender.com/api/admin/edit/${id}`, { ...editData });
            setRegistrationsState(prev => prev.map(reg => (reg._id === id ? res.data.student : reg)));
            setEditingId(null);
            setEditData({});
        } catch (err) {
            alert('Failed to save changes.');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
            try {
                await axios.delete(`https://hillrider.onrender.com/api/admin/delete/${id}`);
                setRegistrationsState(prev => prev.filter(reg => reg._id !== id));
            } catch (err) {
                alert('Failed to delete registration.');
            }
        }
    };

    const handleReceipt = async (id) => {
        try {
            const res = await axios.get(`https://hillrider.onrender.com/api/admin/get/${id}`);
            if (res.data) {
                setRegisteredStudent(res.data);
                setShowReceipt(true);
            }
        } catch (error) {
            alert('Failed to fetch receipt data');
        }
    };
    
    const handlePageClick = (data) => setCurrentPage(data.selected);
    
    // --- PAGINATION ---
    const pageCount = Math.ceil(filteredRegistrationsForTable.length / ENTRIES_PER_PAGE);
    const paginatedRegistrations = useMemo(() => {
        const start = currentPage * ENTRIES_PER_PAGE;
        return filteredRegistrationsForTable.slice(start, start + ENTRIES_PER_PAGE);
    }, [filteredRegistrationsForTable, currentPage]);

    // --- UTILITY ---
    const ngoDetails = {
        name: "HILL RIDER MANAV SEWA SAMITI",
        logo: "/logo.png",
        tagline: "Serving Humanity with Dedication",
        address: "123 NGO Lane, Bhopal, MP",
        phone: "+91-9876543210",
        email: "contact@hillriderngo.org",
    };

    function getSchoolName(school, schools) {
        if (!school) return "Unknown";
        if (typeof school === 'object' && school.name) return school.name;
        const found = schools.find(s => s._id === school);
        return found ? found.name : "Unknown";
    }

    // --- RENDER LOGIC ---
    if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading dashboard...</p></div>;
    if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;

    if (showBulkReceipts) {
        return <BulkReceiptPrint registrations={filteredRegistrationsForTable} ngo={ngoDetails} onClose={() => setShowBulkReceipts(false)} />;
    }

    if (showPrintList) {
        return <RegistrationListPrint registrations={filteredRegistrationsForTable} ngo={ngoDetails} onClose={() => setShowPrintList(false)} />;
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="space-y-6 p-4 md:p-8">
                {!showReceipt ? (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Registrations Dashboard</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Valid Registrations" value={kpis.totalValid} icon={Users} bgColor="bg-blue-100" iconColor="text-blue-600" />
                            <StatCard title="Online (Paid)" value={kpis.paid} icon={CheckCircle} bgColor="bg-green-100" iconColor="text-green-600" />
                            <StatCard title="Offline (Paid)" value={kpis.offline} icon={Users} bgColor="bg-slate-100" iconColor="text-slate-600" />
                            <StatCard title="Pending Verification" value={kpis.pending} icon={Clock} bgColor="bg-yellow-100" iconColor="text-yellow-600" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm"><div className="p-4 border-b"><h3 className="text-lg font-semibold text-gray-800">Valid Registration Types</h3></div><div className="p-4 h-80"><Pie data={pieChartData} options={chartOptions} /></div></div>
                            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm"><div className="p-4 border-b"><h3 className="text-lg font-semibold text-gray-800">Valid Registrations by School</h3></div><div className="p-4 h-80"><Bar data={barChartData} options={chartOptions} /></div></div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="p-4 md:p-6 border-b flex flex-wrap justify-between items-center gap-4">
                                <h3 className="text-xl font-semibold text-gray-800">All Student Entries</h3>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setShowBulkReceipts(true)} className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50" disabled={filteredRegistrationsForTable.length === 0} title={filteredRegistrationsForTable.length > 0 ? "Print all filtered receipts" : "No receipts to print"}><FileText className="h-5 w-5" /><span>Print Receipts</span></button>
                                    <button onClick={() => setShowPrintList(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"><Printer className="h-5 w-5" /><span>Print List</span></button>
                                </div>
                            </div>
                            
                            <div className="p-4 md:p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /><input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300" /></div>
                                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"><option value="All">All Statuses</option><option value="Paid">Online (Paid)</option><option value="Unverified">Unverified</option><option value="Offline Paid">Offline (Paid)</option></select>
                                    <select value={filterSchool} onChange={e => setFilterSchool(e.target.value)} className="p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"><option value="All">All Schools</option>{uniqueSchools.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}</select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"><option value="all">All Time</option><option value="today">Today</option><option value="custom">Custom Range</option></select>
                                    {dateFilter === 'custom' && (<><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-2.5 border rounded-lg bg-gray-50" /><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-2.5 border rounded-lg bg-gray-50" /></>)}
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y">
                                    <thead className="bg-slate-100"><tr><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">School</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registered On</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th></tr></thead>
                                    <tbody className="bg-white divide-y">
                                        {paginatedRegistrations.length > 0 ? paginatedRegistrations.map(reg => (
                                            <tr key={reg._id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 whitespace-nowrap">{editingId === reg._id ? <div className="flex flex-col gap-2"><input type="text" value={editData.firstName || ''} onChange={e => setEditData({ ...editData, firstName: e.target.value })} className="text-sm p-1.5 border rounded-md" /><input type="text" value={editData.lastName || ''} onChange={e => setEditData({ ...editData, lastName: e.target.value })} className="text-sm p-1.5 border rounded-md" /><input type="text" value={editData.phone || ''} onChange={e => setEditData({ ...editData, phone: e.target.value })} className="text-sm p-1.5 border rounded-md" /></div> : <div><div className="text-sm font-semibold text-gray-900">{reg.firstName} {reg.lastName}</div><div className="text-sm text-gray-500">{reg.phone}</div></div>}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{editingId === reg._id ? <select value={editData.school || ''} onChange={e => setEditData({ ...editData, school: e.target.value })} className="text-sm p-1.5 border rounded-md w-full"><option value="" disabled>-- Select School --</option>{schools.map(s => (<option key={s._id} value={s._id}>{s.name} ({s.code})</option>))}</select> : (reg.school?.name || 'N/A')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{editingId === reg._id ? <select value={editData.paymentStatus || ''} onChange={e => setEditData({ ...editData, paymentStatus: e.target.value })} className="text-sm p-1.5 border rounded-md w-full"><option value="Paid">Paid</option><option value="Unverified">Unverified</option><option value="Offline Paid">Offline Paid</option></select> : <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : reg.paymentStatus === 'Unverified' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{reg.paymentStatus}</span>}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{editingId === reg._id ? <input type="date" value={editData.createdAt ? new Date(editData.createdAt).toISOString().slice(0, 10) : ''} onChange={e => setEditData({ ...editData, createdAt: e.target.value })} className="text-sm p-1.5 border rounded-md" /> : new Date(reg.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{editingId === reg._id ? <div className="flex items-center space-x-3"><button onClick={() => handleSave(reg._id)} className="text-green-600 hover:text-green-800 p-1"><Save size={20} /></button><button onClick={handleCancel} className="text-gray-500 hover:text-gray-800 p-1"><X size={20} /></button></div> : <div className="flex items-center space-x-3"><button onClick={() => handleEdit(reg._id)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={18} /></button><button onClick={() => handleDelete(reg._id)} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button><button onClick={() => handleReceipt(reg._id)} className="text-teal-600 hover:text-teal-800" title="View Receipt"><FileText size={18} /></button></div>}</td>
                                            </tr>
                                        )) : (<tr><td colSpan="5" className="text-center py-10 text-gray-500">No matching registrations found.</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                            {pageCount > 1 && (
                                <div className="flex justify-center p-6 border-t">
                                    <ReactPaginate previousLabel={"← Prev"} nextLabel={"Next →"} breakLabel={"..."} pageCount={pageCount} marginPagesDisplayed={1} pageRangeDisplayed={3} onPageChange={handlePageClick} containerClassName={"flex items-center space-x-1"} pageLinkClassName={"px-4 py-2 block"} previousLinkClassName={"px-4 py-2 block"} nextLinkClassName={"px-4 py-2 block"} pageClassName={"rounded-md border bg-white text-gray-600 hover:bg-gray-100"} previousClassName={"rounded-md border bg-white text-gray-600 hover:bg-gray-100"} nextClassName={"rounded-md border bg-white text-gray-600 hover:bg-gray-100"} activeClassName={"!bg-blue-600 !border-blue-600 !text-white hover:!bg-blue-700"} disabledClassName={"opacity-50 cursor-not-allowed"} forcePage={currentPage} />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    registeredStudent && (
                        <div className="flex flex-col items-center justify-center min-h-screen">
                            <div className="p-4 bg-white rounded-xl shadow-lg w-full max-w-3xl my-10">
                                <div className="flex justify-between items-center mb-4 p-2 border-b"><h3 className="text-xl font-bold text-gray-800">Registration Receipt</h3><button onClick={() => setShowReceipt(false)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Close</button></div>
                                <RegistrationReceipt languageType="en" ngo={ngoDetails} student={{ ...registeredStudent, school: getSchoolName(registeredStudent.school, schools) }} registrationId={registeredStudent.studentCode} issuedAt={registeredStudent.createdAt} documentTitle="Admin Registration" />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default RegistrationDashboard;