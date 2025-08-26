import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/registration.css"; // Using the original stylesheet
import RegistrationPrint from "./RegistrationPrint";

// function calculateFee(classValue, subjectValue) {
//   let fee = 0;
//   const classNum = parseInt(classValue, 10);
//   if (classNum >= 1 && classNum <= 5) fee = 120;
//   else if (classNum >= 6 && classNum <= 8) fee = 130;
//   else if (classNum >= 9 && classNum <= 10) fee = 150;
//   else if (classNum >= 11 && classNum <= 12) fee = 180;
//   else if (classNum >= 13) fee = 210;
//   else fee = 0;
//   return fee;
// }

export default function OlyRegistration({ languageType }) {
  const content = {
    en: {
      title: "HR Olympiad Registration",
      firstName: "First Name",
      lastName: "Last Name",
      dob: "Date of Birth",
      class: "Class",
      phone: "Phone Number",
      school: "School",
      subject: "Subject",
      transactionId: "Transaction ID",
      register: "Register Now",
      selectSchool: "-- Select Your School --",
      loadingSchools: "Loading...",
      successMsg: "Registration submitted for verification!",
      errorMsg: "Registration failed. Please try again."
    },
    hi: {
      title: "ओलंपियाड पंजीकरण",
      firstName: "पहला नाम",
      lastName: "उपनाम",
      dob: "जन्म तिथि",
      class: "कक्षा",
      phone: "फ़ोन नंबर",
      school: "विद्यालय",
      subject: "विषय",
      transactionId: "लेन-देन आईडी",
      register: "पंजीकरण करें",
      selectSchool: "-- अपना विद्यालय चुनें --",
      loadingSchools: "लोड हो रहा है...",
      successMsg: "पंजीकरण सत्यापन के लिए जमा किया गया!",
      errorMsg: "पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।"
    },
  };

  const selectedContent = content[languageType] || content.en;

  // Form states including new fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    class: "",
    phone: "",
    school: "",
    amount: "",
    subject: "Mathematics",
    transactionId: "",
    aadharNumber: '',
    gender: '',
    category: '',
    competitionCategory: '',
    village: '',
    post: '',
    district: '',
    state: '',
    pinCode: '',
  });
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [feeConfig, setFeeConfig] = useState({});
  const [fee, setFee] = useState(0);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);


  // Fetch schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/schools');
        setSchools(res.data);
      } catch (err) {
        console.error("Failed to fetch schools", err);
        setError('Could not load school list.');
      }
    };
    fetchSchools();
  }, []);

  // useEffect(() => {
  //   const fee = calculateFee(formData.class, formData.subject);
  //   setFormData(prev => ({ ...prev, amount: fee }));
  // }, [formData.class, formData.subject]);

  useEffect(() => {
    const fetchFeeConfig = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students/fee");
        setFeeConfig(res.data);
      } catch (err) {
        console.error("Failed to fetch fee config", err);
        setError("Could not load fee configuration.");
      }
    };

    fetchFeeConfig();
  }, []);

  useEffect(() => {
    const cls = formData.class;
    if (cls && feeConfig[cls] !== undefined) {
      setFee(feeConfig[cls]);
      setFormData(prev => ({ ...prev, amount: feeConfig[cls] }));
    }

    let competitionCategory = '';
    if (cls >= 1 && cls <= 5) competitionCategory = 'Primary';
    else if (cls >= 6 && cls <= 8) competitionCategory = 'Junior';
    else if (cls >= 9 && cls <= 10) competitionCategory = 'High-School';
    else if (cls >= 11 && cls <= 13) competitionCategory = '10+2';
    setFormData(prev => ({ ...prev, competitionCategory }));
  }, [formData.class, feeConfig]);

  const validateForm = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required ";

      //DOB 
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

      //Class 
      if (!formData.class) newErrors.class = "Class is required";

      //Phone (10 digits)
      if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }

      //Aadhar (12 digits)
      if (!/^\d{12}$/.test(formData.aadharNumber)) {
        newErrors.aadharNumber = "Aadhar must be 12 digits";
      }

      //Pincode (6 digits)
      if (!/^\d{6}$/.test(formData.pinCode)) {
        newErrors.pinCode = "Pincode must be 6 digits";
      }

      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.competitionCategory) newErrors.competitionCategory = "Competition Category is required";

      if (!formData.school) newErrors.school = "School is required";
      if (!formData.village) newErrors.village = "Village is required";
      if (!formData.post) newErrors.post = "Post is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.state) newErrors.state = "State is required";
    }
    if (step === 2) {
      if (!formData.transactionId.trim()) newErrors.transactionId = "Transaction ID is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) setStep(2);
  };

  const prevStep = () => setStep(1);

  // Input change handle function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit with new logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await axios.post("http://localhost:5000/api/students/register-payment", formData);
      setSuccessMessage(res.data.message || selectedContent.successMsg);
      setRegisteredStudent(res.data.student);
      setFormData({
        firstName: "", lastName: "", dateOfBirth: "", class: "",
        phone: "", amount: "", school: "", subject: "Mathematics", transactionId: "",
        gender: '', category: '', competitionCategory: '', village: '', post: '', district: '', state: '', pinCode: '', aadharNumber: ''
      });
      setErrors({});
    } catch (err) {
      setError(err.response?.data?.message || selectedContent.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      
      <div className="flex mb-6">
        <div className={`flex-1 text-center ${step === 1 ? "font-bold text-blue-600" : "text-gray-400"}`}>
          Step 1: Student Details
        </div>
        <div className={`flex-1 text-center ${step === 2 ? "font-bold text-blue-600" : "text-gray-400"}`}>
          Step 2: Payment
        </div>
      </div><br />

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <label className="text-l font-semibold">Personal & Academic Details</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full border rounded p-3 focus:outline-none" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div>
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full border rounded p-3 focus:outline-none" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full border rounded p-3 focus:outline-none" />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <select name="class" value={formData.class} onChange={handleChange} className="w-full border rounded p-3 bg-white focus:outline-none">
                <option value="">Select Class</option>
                {[...Array(13).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
              {errors.class && <p className="text-red-500 text-sm">{errors.class}</p>}

              <select name="subject" value={formData.subject} onChange={handleChange} className="w-full border rounded p-3 bg-white focus:outline-none">
                <option value="">-- Select Subject --</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
              </select>
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}

              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded p-3 bg-white focus:outline-none">
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

              <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded p-3 bg-white focus:outline-none">
                <option value="">-- Select Category --</option>
                <option value="GN">GN</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div>
              <input
                type="text"
                name="competitionCategory"
                value={formData.competitionCategory}
                readOnly
                className="w-full border rounded p-3 bg-gray-100 cursor-not-allowed"
              />
              {errors.competitionCategory && (
                <p className="text-red-500 text-sm">{errors.competitionCategory}</p>
              )}
            </div>

            <select name="school" value={formData.school} onChange={handleChange} className="w-full border rounded p-3 bg-white focus:outline-none">
              <option value="">-- Select School --</option>
              {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}
            
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border rounded p-3 focus:outline-none" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            <input type="text" name="aadharNumber" placeholder="Aadhar Number (12 digits)" value={formData.aadharNumber} onChange={handleChange} className="w-full border rounded p-3 focus:outline-none" />
            {errors.aadharNumber && <p className="text-red-500 text-sm">{errors.aadharNumber}</p>}


            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="col-span-2 font-semibold">Address Details:</label>
              <div className="flex flex-col">
                <input type="text" name="village" placeholder="Village" value={formData.village} onChange={handleChange} className="border rounded p-3 focus:outline-none" />
                {errors.village && <p className="text-red-500 text-sm">{errors.village}</p>}
              </div>
              <div className="flex flex-col">
                <input type="text" name="post" placeholder="Post Office" value={formData.post} onChange={handleChange} className="border rounded p-3 focus:outline-none" />
                {errors.post && <p className="text-red-500 text-sm">{errors.post}</p>}
              </div>
              <div className="flex flex-col">
                <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} className="border rounded p-3 focus:outline-none" />
                {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
              </div>
              <div className="flex flex-col">
                <select name="state" value={formData.state} onChange={handleChange} className="w-full border rounded p-3 bg-white focus:outline-none">
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
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div className="flex flex-col">
                <input type="text" name="pinCode" placeholder="Pin Code (6 digits)" value={formData.pinCode} onChange={handleChange} className="border rounded p-3 focus:outline-none" />
                {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode}</p>}
              </div>
            </div>


            <button type="button" onClick={nextStep} className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Next →
            </button>
          </div>
        )}


        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">Payment Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] items-center gap-6  ">
              <img
                src="/images/qrcode.png"
                alt="QR Code for payment"
                className="w-52 h-52 rounded-lg shadow-md border border-gray-200"
              />
              <div className="bg-gray-50 border rounded-lg p-4 shadow-sm space-y-2">
                <p><span className="font-medium">Bank Name:</span> State Bank of India</p>
                <p><span className="font-medium">Account Name:</span> Hill Rider Manav Sewa Samiti</p>
                <p><span className="font-medium">Account Number:</span> 123456789012</p>
                <p><span className="font-medium">IFSC Code:</span> SBIN0001234</p>
                <p><span className="font-medium">Branch:</span> Bhopal Main</p>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-md text-center w-full">
              <p className="font-semibold text-gray-700">Payable Fee: ₹{fee}</p>
            </div>
            <input
              type="text"
              name="transactionId"
              placeholder="Enter Transaction ID"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full border rounded p-3 focus:outline-none"
            />
            {errors.transactionId && (
              <p className="text-red-500 text-sm">{errors.transactionId}</p>
            )}

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
      {registeredStudent && (
        <div className="my-10 p-4 bg-white rounded-lg shadow-lg overflow-x-auto">

          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Registration Receipt
          </h3>
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
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
                documentTitle="Admin Registered Student"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
