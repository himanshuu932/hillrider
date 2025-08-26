import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Users, Search, CheckCircle, Clock, Printer } from 'lucide-react';
import RegistrationReceipt from '../RegistrationPrint';
import RegistrationListPrint from '../RegistrationListPrint';
import ReactPaginate from 'react-paginate';

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

const ENTRIES_PER_PAGE = 10; // change to show more entries per page

const RegistrationDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [schools, setSchools] = useState([]);
    // State for managing filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterSchool, setFilterSchool] = useState('All');
    const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'custom'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [registrationsState, setRegistrationsState] = useState([]);
    const [registeredStudent, setRegisteredStudent] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showPrintList, setShowPrintList] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    // Fetch registration data from the backend
    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await axios.get('https://hillrider.onrender.com/api/students');
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

    // Sync local state with fetched registrations
    useEffect(() => {
        setRegistrationsState(registrations);
    }, [registrations]);

    // Memoized array for "valid" registrations (Paid or Offline Paid) used for analytics
    const validRegistrations = useMemo(() => {
        return registrations.filter(
            reg => reg.paymentStatus === 'Paid' || reg.paymentStatus === 'Offline Paid'
        );
    }, [registrations]);

    // memoized array for the table with extra filtration , 
    const filteredRegistrationsForTable = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return registrationsState.filter(reg => {
            const fullName = `${reg.firstName} ${reg.lastName}`.toLowerCase();
            const schoolName = reg.school?.name?.toLowerCase() || '';
            const phone = reg.phone?.toLowerCase() || '';

            const matchesSearch =
                fullName.includes(searchTerm.toLowerCase()) ||
                schoolName.includes(searchTerm.toLowerCase()) ||
                phone.includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'All' || reg.paymentStatus === filterStatus;
            const matchesSchool = filterSchool === 'All' || reg.school?._id === filterSchool;

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
    }, [registrationsState, searchTerm, filterStatus, filterSchool, dateFilter, startDate, endDate]);

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

    // Print handler - now shows the print component
    const handlePrint = () => {
        setShowPrintList(true);
    };

    // Prepare filters info for print component
    const getFiltersForPrint = () => {
        const filters = {};
        if (filterStatus !== 'All') filters.status = filterStatus;
        if (filterSchool !== 'All') {
            filters.school = filterSchool;
            const school = uniqueSchools.find(s => s.id === filterSchool);
            filters.schoolName = school ? school.name : 'Unknown';
        }
        if (searchTerm) filters.search = searchTerm;
        if (dateFilter === 'today') filters.dateRange = 'Today';
        if (dateFilter === 'custom' && startDate && endDate) {
            filters.dateRange = `${startDate} to ${endDate}`;
        }
        return filters;
    };

    const handleEdit = (id) => {
        const reg = registrationsState.find(r => r._id === id);
        setEditingId(id);
        // If school is an object, store its _id for editing
        setEditData({
            ...reg,
            school: reg.school?._id || ''
        });
    };

    const handleSave = async (id) => {
        try {
            const editingID = id;
            // Prepare payload for backend (school as id)
            const payload = { ...editData };
            // If school is just id, backend should handle it
            const res = await axios.put(`https://hillrider.onrender.com/api/admin/edit/${editingID}`, payload);
            // Update local state with backend response
            setRegistrationsState(prev => prev.map(reg =>
                reg._id === editingID ? res.data.student : reg
            ));
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

    const handleReceipt = async (id) => {
        setRegisteredStudent(null);
        try {
            const res = await axios.get(`https://hillrider.onrender.com/api/admin/get/${id}`);
            if (res.data) {
                setRegisteredStudent(res.data);
                setShowReceipt(true); // Show only receipt
            }
        } catch (error) {
            alert('Failed to fetch receipt data');
            console.error(error);
        }
    };

    const handleCloseReceipt = () => {
        setShowReceipt(false);
        setRegisteredStudent(null);
    };

    const handleClosePrintList = () => {
        setShowPrintList(false);
    };

    const handleDelete = async (id) => {
        const deleteID = id;
        if (window.confirm('Are you sure you want to delete this registration?')) {
            try {
                await axios.delete(`https://hillrider.onrender.com/api/admin/delete/${deleteID}`);
                setRegistrationsState(prev => prev.filter(reg => reg._id !== id));
            } catch (err) {
                alert('Failed to delete registration.');
            }
        }
    };

    function getSchoolName(school, schools) {
        if (!school) return "Unknown";
        if (typeof school === 'object' && school.name) return school.name;
        const found = schools.find(s => s._id === school);
        return found ? found.name : "Unknown";
    }

    const pageCount = Math.ceil(filteredRegistrationsForTable.length / ENTRIES_PER_PAGE);
    const paginatedRegistrations = useMemo(() => {
        const start = currentPage * ENTRIES_PER_PAGE;
        return filteredRegistrationsForTable.slice(start, start + ENTRIES_PER_PAGE);
    }, [filteredRegistrationsForTable, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    if (loading) return <p className="text-center p-10">Loading dashboard...</p>;
    if (error) return <p className="text-center p-10 text-red-500">{error}</p>;

    // Show Print List View
    if (showPrintList) {
        return (
            <div className="min-h-screen bg-white">
                <div className="p-4 no-print">
                    <button 
                        onClick={handleClosePrintList}
                        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
                <RegistrationListPrint 
                    registrations={filteredRegistrationsForTable}
                    title={`Student Registration List (${filteredRegistrationsForTable.length} records)`}
                    ngo={{
                        name: "HILL RIDER MANAV SEWA SAMITI",
                        logo: "/logo.png",
                        tagline: "Serving Humanity with Dedication",
                        address: "123 NGO Lane, Bhopal, MP",
                        phone: "+91-9876543210",
                        email: "contact@hillriderngo.org",
                    }}
                    filters={getFiltersForPrint()}
                    generatedAt={new Date()}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 p-4 md:p-6">
            {!showReceipt ? (
                <>
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
                                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-3 border rounded-md bg-gray-50" />
                                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-3 border rounded-md bg-gray-50" />
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedRegistrations.length > 0 ? paginatedRegistrations.map(reg => (
                                        <tr key={reg._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === reg._id ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={editData.firstName || ''}
                                                            onChange={e => setEditData({ ...editData, firstName: e.target.value })}
                                                            className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editData.lastName || ''}
                                                            onChange={e => setEditData({ ...editData, lastName: e.target.value })}
                                                            className="text-sm text-gray-500 border rounded px-2 py-1"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editData.phone || ''}
                                                            onChange={e => setEditData({ ...editData, phone: e.target.value })}
                                                            className="text-sm text-gray-500 border rounded px-2 py-1"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{reg.firstName} {reg.lastName}</div>
                                                        <div className="text-sm text-gray-500">{reg.phone}</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {editingId === reg._id ? (
                                                    <select
                                                        value={editData.school || ''}
                                                        onChange={e => setEditData({ ...editData, school: e.target.value })}
                                                        className="text-sm border rounded px-2 py-1"
                                                    >
                                                        <option value="" disabled>-- Select School --</option>
                                                        {schools.length > 0 ? (
                                                            schools.map(school => (
                                                                <option key={school._id} value={school._id}>{school.name} ({school.code})</option>
                                                            ))
                                                        ) : (
                                                            <option disabled>Loading schools...</option>
                                                        )}
                                                    </select>
                                                ) : (
                                                    reg.school?.name || 'N/A'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === reg._id ? (
                                                    <select
                                                        value={editData.paymentStatus || ''}
                                                        onChange={e => setEditData({ ...editData, paymentStatus: e.target.value })}
                                                        className="text-xs font-semibold rounded-full px-2 py-1"
                                                    >
                                                        <option value="Paid">Paid</option>
                                                        <option value="Unverified">Unverified</option>
                                                        <option value="Offline Paid">Offline Paid</option>
                                                    </select>
                                                ) : (
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                                                        reg.paymentStatus === 'Unverified' ? 'bg-yellow-100 text-yellow-800' :
                                                            reg.paymentStatus === 'Offline Paid' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {reg.paymentStatus}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {editingId === reg._id ? (
                                                    <input
                                                        type="date"
                                                        value={editData.createdAt ? new Date(editData.createdAt).toISOString().slice(0, 10) : ''}
                                                        onChange={e => setEditData({ ...editData, createdAt: e.target.value })}
                                                        className="text-sm border rounded px-2 py-1"
                                                    />
                                                ) : (
                                                    new Date(reg.createdAt).toLocaleDateString()
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {editingId === reg._id ? (
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => handleSave(reg._id)} className="text-green-600 hover:text-green-900">Save</button>
                                                        <button onClick={handleCancel} className="text-red-600 hover:text-red-900">Cancel</button>
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => handleEdit(reg._id)} className="text-blue-600 hover:text-blue-900">Edit</button>
                                                        <button onClick={() => handleDelete(reg._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                                        <button onClick={() => handleReceipt(reg._id)} className="text-green-600 hover:text-green-900">Receipt</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-10 text-gray-500">No matching registrations found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {pageCount > 1 && (
                                <div className="flex justify-center mt-6">
                                    <ReactPaginate
                                        previousLabel={"← Prev"}
                                        nextLabel={"Next →"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination flex space-x-2"}
                                        pageClassName={"px-3 py-1 rounded border bg-gray-100 text-gray-700"}
                                        activeClassName={"bg-blue-500 text-white"}
                                        previousClassName={"px-3 py-1 rounded border bg-gray-100 text-gray-700"}
                                        nextClassName={"px-3 py-1 rounded border bg-gray-100 text-gray-700"}
                                        disabledClassName={"opacity-50 cursor-not-allowed"}
                                        forcePage={currentPage}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                registeredStudent && (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                        <div className="my-10 p-4 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Registration Receipt
                                </h3>
                                <button
                                    onClick={handleCloseReceipt}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                            <RegistrationReceipt
                                languageType="en"
                                ngo={{
                                    name: "HILL RIDER MANAV SEWA SAMITI",
                                    logo: "/logo.png",
                                    tagline: "Serving Humanity with Dedication",
                                    address: "123 NGO Lane, Bhopal, MP",
                                    phone: "+91-9876543210",
                                    email: "contact@hillriderngo.org",
                                }}
                                student={{
                                    firstName: registeredStudent.firstName,
                                    lastName: registeredStudent.lastName,
                                    dateOfBirth: registeredStudent.dateOfBirth,
                                    class: registeredStudent.class,
                                    phone: registeredStudent.phone,
                                    school: getSchoolName(registeredStudent.school, schools),
                                    subject: registeredStudent.subject,
                                    transactionId: registeredStudent.transactionId || "N/A",
                                    aadharNumber: registeredStudent.aadharNumber,
                                    gender: registeredStudent.gender,
                                    category: registeredStudent.category,
                                    competitionCategory: registeredStudent.competitionCategory,
                                    village: registeredStudent.village,
                                    post: registeredStudent.post,
                                    district: registeredStudent.district,
                                    pinCode: registeredStudent.pinCode,
                                    state: registeredStudent.state,
                                    paymentStatus: registeredStudent.paymentStatus || "Unverified",
                                    amount: registeredStudent.amount,
                                    studentCode: registeredStudent.studentCode,
                                }}
                                registrationId={registeredStudent.studentCode}
                                issuedAt={registeredStudent.createdAt}
                                documentTitle="Admin Registration"
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default RegistrationDashboard;