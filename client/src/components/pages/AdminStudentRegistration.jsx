import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStudentRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        class: '',
        phone: '',
        school: '',
        subject: 'Mathematics', // Default subject
    });
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch schools on component mount
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/schools');
                setSchools(res.data);
            } catch (err) {
                console.error("Failed to fetch schools", err);
                setError('Could not load school list. Please refresh the page.');
            }
        };
        fetchSchools();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        if (!formData.school) {
            setError('Please select a school.');
            setIsLoading(false);
            return;
        }

        try {
            // Using the admin route that does NOT require a transactionId
            const res = await axios.post('http://localhost:5000/api/students/register-admin', formData);
            setSuccessMessage(res.data.message);
            // Reset form
            setFormData({
                firstName: '', lastName: '', dateOfBirth: '', class: '',
                phone: '', school: '', subject: 'Mathematics'
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg my-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Panel</h2>
            <p className="text-center text-gray-600 mb-8">Register a New Student</p>
            
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="p-3 border rounded-md" />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="p-3 border rounded-md" />
                </div>
                
                <div>
                    <label className="text-sm text-gray-600">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full p-3 border rounded-md" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="class" placeholder="Class (e.g., 9th)" value={formData.class} onChange={handleChange} required className="p-3 border rounded-md" />
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="p-3 border rounded-md" />
                </div>

                <div>
                    <select name="school" value={formData.school} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white">
                        <option value="" disabled>-- Select School --</option>
                        {schools.length > 0 ? (
                            schools.map(school => (
                                <option key={school._id} value={school._id}>{school.name} ({school.code})</option>
                            ))
                        ) : (
                            <option disabled>Loading schools...</option>
                        )}
                    </select>
                </div>

                 <div>
                    <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white">
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400">
                    {isLoading ? 'Registering...' : 'Register Student'}
                </button>
            </form>
        </div>
    );
};

export default AdminStudentRegistration;
