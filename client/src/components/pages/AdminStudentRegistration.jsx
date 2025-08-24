import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationPrint from '../RegistrationPrint';

function calculateFee(classValue, subjectValue) {
    let fee = 0;
    const classNum = parseInt(classValue, 10);
    if (classNum >= 1 && classNum <= 5) fee = 120;
    else if (classNum >= 6 && classNum <= 8) fee = 130;
    else if (classNum >= 9 && classNum <= 10) fee = 150;
    else if (classNum >= 11 && classNum <= 12) fee = 180;
    else if (classNum >= 13) fee = 210;
    else fee = 0;
    return fee;
}

const AdminStudentRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        class: '',
        phone: '',
        school: '',
        amount: '',
        subject: 'Mathematics', // Default subject
        category: '',
        competitionCategory: '',
        village: '',
        post: '',
        district: '',
        state: '',
        gender: '',
        pinCode: ''

    });
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [registeredStudent, setRegisteredStudent] = useState(null);

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


    useEffect(() => {
        const fee = calculateFee(formData.class, formData.subject);
        setFormData(prev => ({ ...prev, amount: fee }));
    }, [formData.class, formData.subject]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        setRegisteredStudent(null);

        if (!formData.school) {
            setError('Please select a school.');
            setIsLoading(false);
            return;
        }
        try {
            // Using the admin route that does NOT require a transactionId
            const res = await axios.post('http://localhost:5000/api/students/register-admin', formData);
            setSuccessMessage(res.data.message);
            setRegisteredStudent(res.data.student);
            console.log(res);
            setFormData({
                firstName: '', lastName: '', dateOfBirth: '', class: '',
                phone: '', school: '', subject: 'Mathematics', gender: '', category: '', competitionCategory: '',
                village: '', post: '', district: '', state: '', pinCode: '',
                aadharNumber: ''
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} required className="p-3 border rounded-md" /> </div>

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

                <div>
                    <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white">
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white">
                        <option value="">-- Select Category --</option>
                        <option value="GN">GN</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>
                <div>
                    <select name="competitionCategory" value={formData.competitionCategory} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white">
                        <option value="">-- Select Competition Category --</option>
                        <option value="Primary">Primary</option>
                        <option value="Junior">Junior</option>
                        <option value="High-School">High-School</option>
                        <option value="10+2">10+2</option>
                    </select>
                </div><br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='flex flex-col'>
                        <label className="text-sm text-gray-600">Village</label>
                        <input type="text" name="village" value={formData.village} onChange={handleChange} required className="p-3 border rounded-md" />
                    </div>
                    <div className='flex flex-col'>
                        <label className="text-sm text-gray-600">Post</label>
                        <input type="text" name="post" value={formData.post} onChange={handleChange} required className="p-3 border rounded-md" />
                    </div>
                    <div className='flex flex-col'>
                        <label className="text-sm text-gray-600">District</label>
                        <input type="text" name="district" value={formData.district} onChange={handleChange} required className="p-3 border rounded-md" />
                    </div>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md bg-white"
                    >
                        <option value="">-- Select State --</option>

                        {/* States */}
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>

                        {/* Union Territories */}
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                            Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                    </select>
                    <div className='flex flex-col'>
                        <label className="text-sm text-gray-600">PinCode</label>
                        <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="p-3 border rounded-md" />
                    </div>
                    <div className="form-group full-width">
                        <label>Calculated Fee</label>
                        <div className="font-bold text-green-700">
                            ₹{formData.amount || 0}
                        </div>
                    </div>
                </div>


                <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400">
                    {isLoading ? 'Registering...' : 'Register Student'}
                </button>
            </form>
            {registeredStudent && (
                <div className="my-10 p-4 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Registration Receipt
                    </h3>
                    <RegistrationPrint
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
                            dob: registeredStudent.dateOfBirth,
                            class: registeredStudent.class,
                            amount: registeredStudent.amount,
                            phone: registeredStudent.phone,
                            school: schools.find(s => s._id === registeredStudent.school)?.name || "Unknown",
                            subject: registeredStudent.subject,
                            transactionId: registeredStudent.transactionId || "N/A",
                        }}
                        registrationId={registeredStudent.studentCode}
                        issuedAt={registeredStudent.createdAt}
                        documentTitle="Admin Registered Student"
                    />
                </div>
            )}

        </div>
    );
};

export default AdminStudentRegistration;
