import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationReceipt from '../helpers/RegistrationPrint';
import { UploadCloud } from 'lucide-react'; // ADDED for icon

const AdminStudentRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '', // ADDED
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

    // --- ADDED state for photo handling ---
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    // ---

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

    // --- ADDED handler for photo input changes ---
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required"; // ADDED
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
        if (!photo) newErrors.photo = "Student photo is required"; // ADDED

        if (!formData.phone) newErrors.phone = "Phone number is required";
        else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number";

        if (!formData.gender) newErrors.gender = "Please select gender";
        if (!formData.category) newErrors.category = "Please select category";

        if (!/^\d{12}$/.test(formData.aadharNumber)) {
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


    // --- COMPLETELY REWRITTEN handleSubmit function for 2-step process ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        setRegisteredStudent(null);

        try {
            // Step 1: Upload the photo to YOUR backend server
            const photoFormData = new FormData();
            photoFormData.append('photo', photo);

            const uploadRes = await axios.post('https://hillrider.onrender.com/api/students/upload-photo', photoFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const photoUrl = uploadRes.data.photoUrl;

            // Step 2: Submit the student registration data with the photo URL from your server
            const studentData = { ...formData, photoUrl };
            const res = await axios.post('https://hillrider.onrender.com/api/students/register-admin', studentData);
             console.log("Response from server:");
             console.log(res.data);
            setSuccessMessage(res.data.message);
            setRegisteredStudent(res.data.student);
            
            // Reset form completely
            setFormData({
                firstName: '', lastName: '', fatherName: '', dateOfBirth: '', class: '',
                phone: '', school: '', subject: 'Mathematics', gender: '', category: '', competitionCategory: '',
                village: '', post: '', district: '', state: '', pinCode: '',
                aadharNumber: '', amount: ''
            });
            setPhoto(null);
            setPhotoPreview(null);
            setFee(0);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pr-8 pl-8 pb-8 pt-4 bg-gray-50 shadow-lg rounded-lg my-5">
          
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
            {successMessage && !registeredStudent && (
                <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4">{successMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT: PERSONAL DETAILS */}
                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="text-lg font-semibold text-gray-700">Personal Details</legend>
                        
                        {/* --- ADDED Photo Upload UI --- */}
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Student" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-gray-500 text-center">Photo</span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                    <UploadCloud className="w-4 h-4 mr-2"/>
                                    Upload Photo
                                </label>
                                <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                                {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                            </div>
                        </div>
                        {/* --- END Photo Upload UI --- */}

                        <div className="space-y-4">
                            {/* First & Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md w-full"
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md w-full"
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                                </div>
                            </div>

                            {/* --- ADDED Father's Name Input --- */}
                            <div>
                                <input
                                    type="text"
                                    name="fatherName"
                                    placeholder="Father's Name"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md w-full"
                                />
                                {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
                            </div>
                            {/* --- END Father's Name Input --- */}

                            {/* DOB & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md w-full"
                                    />
                                    {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md w-full"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Gender & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md w-full bg-white"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                                </div>
                                <div>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md w-full bg-white"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="GN">GN</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                                </div>
                            </div>

                            {/* Aadhaar */}
                            <div>
                                <input
                                    type="text"
                                    name="aadharNumber"
                                    placeholder="Aadhar Number"
                                    value={formData.aadharNumber}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md w-full"
                                />
                                {errors.aadharNumber && <p className="text-red-500 text-sm">{errors.aadharNumber}</p>}
                            </div>
                        </div>
                    </fieldset>

                    {/* RIGHT: ACADEMIC DETAILS */}
                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="text-lg font-semibold text-gray-700">Academic Details</legend>
                        <div className="space-y-4">
                            {/* School */}
                            <div>
                                <select
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md bg-white"
                                >
                                    <option value="">Select School</option>
                                    {schools.map((s) => (
                                        <option key={s._id} value={s._id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}
                            </div>

                            {/* Class + Subject */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <select
                                        name="class"
                                        value={formData.class}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md bg-white w-full"
                                    >
                                        <option value="">Select Class</option>
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.class && <p className="text-red-500 text-sm">{errors.class}</p>}
                                </div>
                                <div>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="p-3 border rounded-md bg-white w-full"
                                    >
                                        <option value="">Select Subject</option>
    <option value="Mathematics">Mathematics</option>
    <option value="GS/GK">GS/GK</option>
    <option value="PCM">PCM</option>
    <option value="PCB">PCB</option>
    <option value="Science">Science</option>
    <option value="English">English</option>
                                    </select>
                                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 border rounded-md bg-gray-50 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Fee</span>
                                    <span className="font-semibold">₹{fee}</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="competitionCategory"
                                        value={formData.competitionCategory}
                                        readOnly
                                        className="p-3 border rounded-md bg-gray-100 w-full"
                                    />
                                    {errors.competitionCategory && (
                                        <p className="text-red-500 text-sm">{errors.competitionCategory}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                {/* ADDRESS SECTION */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-gray-700">Address</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <input
                                type="text"
                                name="village"
                                placeholder="Village"
                                value={formData.village}
                                onChange={handleChange}
                                className="p-3 border rounded-md w-full"
                            />
                            {errors.village && <p className="text-red-500 text-sm">{errors.village}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="post"
                                placeholder="Post Office"
                                value={formData.post}
                                onChange={handleChange}
                                className="p-3 border rounded-md w-full"
                            />
                            {errors.post && <p className="text-red-500 text-sm">{errors.post}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="district"
                                placeholder="District"
                                value={formData.district}
                                onChange={handleChange}
                                className="p-3 border rounded-md w-full"
                            />
                            {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="pinCode"
                                placeholder="Pin Code"
                                value={formData.pinCode}
                                onChange={handleChange}
                                className="p-3 border rounded-md w-full"
                            />
                            {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="p-3 border rounded-md bg-white w-full"
                            >
                                <option value="">Select State</option>
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
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition disabled:bg-green-400"
                >
                    {isLoading ? "Registering..." : "Register Student"}
                </button>
            </form>

            {registeredStudent && (
                <div className="my-10">
                    <RegistrationReceipt
                        languageType="en"
                        
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
            )
            }
        </div >
    );
};

export default AdminStudentRegistration;