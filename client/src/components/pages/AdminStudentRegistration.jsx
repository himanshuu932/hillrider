import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationReceipt from '../RegistrationPrint';

// This function is no longer needed as fees are fetched from the API.
// function calculateFee(classValue, subjects) { ... }

const AdminStudentRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        class: '',
        phone: '',
        school: '',
        amount: '',
        subject: 'Mathematics',
        category: '',
        competitionCategory: '',
        village: '',
        post: '',
        district: '',
        state: '',
        gender: '',
        pinCode: '',
        aadharNumber: ''
    });
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [registeredStudent, setRegisteredStudent] = useState(null);
    const [feeConfig, setFeeConfig] = useState({});
    const [fee, setFee] = useState(0);
    const [errors, setErrors] = useState({});


    // Fetch schools on component mount
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

    // Fetch fee configuration
    useEffect(() => {
        const fetchFeeConfig = async () => {
            try {
                const res = await axios.get("https://hillrider.onrender.com/api/students/fee");
                setFeeConfig(res.data);
            } catch (err) {
                console.error("Failed to fetch fee config", err);
                setError("Could not load fee configuration.");
            }
        };
        fetchFeeConfig();
    }, []);

    // *** ENHANCEMENT: Automatically update fee and competition category when class changes ***
    useEffect(() => {
        const classNum = parseInt(formData.class, 10);
        let category = '';
        if (classNum >= 1 && classNum <= 5) category = 'Primary';
        else if (classNum >= 6 && classNum <= 8) category = 'Junior';
        else if (classNum >= 9 && classNum <= 10) category = 'High-School';
        else if (classNum >= 11 && classNum <= 12) category = '10+2';
        else if (classNum >= 13) category = '10+2';

        const newFee = feeConfig[formData.class] !== undefined ? feeConfig[formData.class] : 0;
        setFee(newFee);

        setFormData(prev => ({
            ...prev,
            amount: newFee,
            competitionCategory: category
        }));

    }, [formData.class, feeConfig]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";

        if (!formData.phone) newErrors.phone = "Phone number is required";
        else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number";

        if (!formData.gender) newErrors.gender = "Please select gender";
        if (!formData.category) newErrors.category = "Please select category";

        if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber)) {
            newErrors.aadharNumber = "Aadhar must be 12 digits";
        }

        if (!formData.school) newErrors.school = "Please select a school";
        if (!formData.class) newErrors.class = "Please select a class";
        if (!formData.subject) newErrors.subject = "Please select a subject";

        if (!formData.village) newErrors.village = "Village is required";
        if (!formData.post) newErrors.post = "Post Office is required";
        if (!formData.district) newErrors.district = "District is required";

        if (!formData.pinCode) newErrors.pinCode = "Pin code is required";
        else if (!/^\d{6}$/.test(formData.pinCode)) newErrors.pinCode = "Enter a valid 6-digit pin code";

        if (!formData.state) newErrors.state = "Please select state";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
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
            const res = await axios.post('https://hillrider.onrender.com/api/students/register-admin', formData);
            setSuccessMessage(res.data.message);
            setRegisteredStudent(res.data.student);
            // Reset form
            setFormData({
                firstName: '', lastName: '', dateOfBirth: '', class: '',
                phone: '', school: '', subject: 'Mathematics', gender: '', category: '', competitionCategory: '',
                village: '', post: '', district: '', state: '', pinCode: '',
                aadharNumber: '', amount: ''
            });
            setFee(0); // Reset fee display
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg my-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Panel</h2>
            <p className="text-center text-gray-600 mb-8">Register a New Student</p>

            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
            {successMessage && !registeredStudent && <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* *** ENHANCEMENT: Form Sections *** */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-gray-700">Personal Information</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="flex flex-col">
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="flex flex-col">
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600">Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-3 border rounded-md" />
                            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                        </div>
                        <div className="flex flex-col">
                            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div className="flex flex-col">
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border rounded-md bg-white">
                                <option value="">-- Select Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                        </div>
                        <div className="flex flex-col">
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-md bg-white">
                                <option value="">-- Select Category --</option>
                                <option value="GN">GN</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>
                        <div className="flex flex-col">
                            <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} className="p-3 border rounded-md md:col-span-2" />
                            {errors.aadharNumber && <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>}
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-gray-700">Academic Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <select name="school" value={formData.school} onChange={handleChange} className="w-full p-3 border rounded-md bg-white md:col-span-2">
                            <option value="" disabled>-- Select School --</option>
                            {schools.length > 0 ? (
                                schools.map(school => (
                                    <option key={school._id} value={school._id}>{school.name} ({school.code})</option>
                                ))
                            ) : (
                                <option disabled>Loading schools...</option>
                            )}
                        </select>
                        {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school}</p>}
                        <div className="flex items-center gap-4">
                            
                                <select name="class" value={formData.class} onChange={handleChange} className="w-full p-3 border rounded-md bg-white">
                                    <option value="">Select Class</option>
                                    {[...Array(13).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                                </select>
                                {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class}</p>}
                            
                            {/* *** ENHANCEMENT: Improved Fee Display *** */}
                            <div className="flex flex-col items-center">
                                <label className="text-sm text-gray-600">Fee</label>
                                <span className="text-xl font-bold text-green-600">₹{fee}</span>
                            </div>
                        </div>
                        <select name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border rounded-md bg-white">
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="English">English</option>
                        </select>
                        {/* *** ENHANCEMENT: Read-only automated category *** */}
                        <div>
                            <label className="text-sm text-gray-600">Competition Category</label>
                            <input type="text" name="competitionCategory" value={formData.competitionCategory} readOnly className="w-full p-3 border rounded-md bg-gray-100" />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold px-2 text-gray-700">Address</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className='flex flex-col'>
                            <input type="text" name="village" placeholder="Village" value={formData.village} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <input type="text" name="post" placeholder="Post Office" value={formData.post} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.post && <p className="text-red-500 text-sm mt-1">{errors.post}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <input type="text" name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} className="p-3 border rounded-md" />
                            {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>}
                        </div>
                        <select name="state" value={formData.state} onChange={handleChange} className="w-full p-3 border rounded-md bg-white md:col-span-2">
                            <option value="">-- Select State --</option>
                            {/* A comprehensive list of states and UTs */}
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chandigarh">Chandigarh</option><option value="Chhattisgarh">Chhattisgarh</option><option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option><option value="Delhi">Delhi</option><option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option><option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Ladakh">Ladakh</option><option value="Lakshadweep">Lakshadweep</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option><option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Odisha">Odisha</option><option value="Puducherry">Puducherry</option><option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option><option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand</option><option value="West Bengal">West Bengal</option>
                        </select>
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}

                    </div>
                </fieldset>

                <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400">
                    {isLoading ? 'Registering...' : 'Register Student'}
                </button>
            </form>

            {registeredStudent && (
                <div className="my-10">
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
                            ...registeredStudent,
                            school: schools.find(s => s._id === registeredStudent.school)?.name || "Unknown",
                            transactionId: registeredStudent.transactionId || "N/A",
                            paymentStatus: registeredStudent.paymentStatus || "Verified",
                        }}
                        registrationId={registeredStudent.studentCode}
                        issuedAt={registeredStudent.createdAt}
                        documentTitle="Admin Registration"
                    />
                </div>
            )}
        </div>
    );
};

export default AdminStudentRegistration;