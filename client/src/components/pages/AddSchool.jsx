import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, ListFilter, Clipboard } from 'lucide-react';

const AddSchool = () => {
  // State for the form
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State for the school list
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('All');
  const [copiedPassword, setCopiedPassword] = useState(null);

  // Fetch schools from the API
  const fetchSchools = async () => {
    try {
      setLoadingSchools(true);
      const res = await axios.get('http://localhost:5000/api/schools');
      setSchools(res.data);
    } catch (err) {
      setError('Failed to load the list of schools.');
      console.error("Failed to fetch schools", err);
    } finally {
      setLoadingSchools(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // Handle form submission to add a new school
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/schools/add', { name });
      const newSchool = response.data.school;
      setMessage(`School added! Code: ${newSchool.code}, Password: ${newSchool.password}`);
      setName('');
      fetchSchools(); 
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy text to the user's clipboard
  const copyToClipboard = (text, schoolId) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedPassword(schoolId);
      setTimeout(() => setCopiedPassword(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  // Memoized filtering logic for search and year filter
  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            school.code.toLowerCase().includes(searchTerm.toLowerCase());
      const yearFromCode = school.code.substring(2, 6);
      const matchesYear = filterYear === 'All' || yearFromCode === filterYear;
      return matchesSearch && matchesYear;
    });
  }, [schools, searchTerm, filterYear]);

  const uniqueYears = useMemo(() => {
    const years = new Set(schools.map(school => school.code.substring(2, 6)));
    return ['All', ...Array.from(years).sort((a, b) => b - a)];
  }, [schools]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Column 1: Add School Form */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New School</h3>
          {message && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert"><p className="font-bold">Success</p><p>{message}</p></div>}
          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p className="font-bold">Error</p><p>{error}</p></div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                School Name
              </label>
              <input
                id="schoolName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Hill Riders Academy"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300">
              {isLoading ? 'Adding...' : 'Add School'}
            </button>
          </form>
        </div>
      </div>

      {/* Column 2: School List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Schools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year === 'All' ? 'All Years' : `Year ${year}`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loadingSchools ? (
                  <tr><td colSpan="3" className="text-center py-4">Loading schools...</td></tr>
                ) : filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <tr key={school._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{school.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{school.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        <div className="flex items-center space-x-2">
                          <span>{school.password}</span>
                          <button onClick={() => copyToClipboard(school.password, school._id)} className="text-gray-400 hover:text-blue-600" title="Copy password">
                            {copiedPassword === school._id ? <span className="text-green-500 text-xs">Copied!</span> : <Clipboard className="h-4 w-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="text-center py-4 text-gray-500">No schools found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
