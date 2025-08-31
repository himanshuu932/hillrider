import React, { useState, useEffect } from "react";
import axios from "axios";
import RegistrationPrint from "../helpers/RegistrationPrint"; // Assuming this component exists

// CONSTANTS AND HELPERS ---------------------------------------------------

// Helper component to reduce repetition in form fields
const FormField = ({ id, label, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

// Define initial state outside the component for easy resetting
const initialFormData = {
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    class: "",
    phone: "",
    school: "",
    amount: "",
    subject: "", // Changed to empty for dropdown selection
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
};

const inputBaseClasses = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
const selectBaseClasses = `${inputBaseClasses} pr-10`;

// STEP 1 COMPONENT: STUDENT DETAILS ----------------------------------------

const StudentDetailsStep = ({ formData, errors, schools, photoPreview, handleChange, handlePhotoChange, nextStep }) => (
  <div className="space-y-8">
    {/* --- Personal & Photo Section --- */}
    <fieldset>
      <legend className="text-lg font-semibold text-gray-800 mb-4">Personal Details</legend>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Photo Upload */}
        <div className="md:col-span-1">
          <FormField id="photo" label="Upload Photo" error={errors.photo}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover"/>
                ) : (
                  <span className="text-xs text-gray-500 text-center p-2">Photo Preview</span>
                )}
              </div>
              <input 
                type="file" 
                id="photo" 
                name="photo" 
                accept="image/*" 
                onChange={handlePhotoChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>
          </FormField>
        </div>
        
        {/* Personal Info Fields */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
          <FormField id="firstName" label="First Name" error={errors.firstName}>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={inputBaseClasses} />
          </FormField>
          <FormField id="lastName" label="Last Name" error={errors.lastName}>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={inputBaseClasses} />
          </FormField>
          <FormField id="fatherName" label="Father's Name" error={errors.fatherName}>
            <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} className={inputBaseClasses} />
          </FormField>
          <FormField id="dateOfBirth" label="Date of Birth" error={errors.dateOfBirth}>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputBaseClasses} />
          </FormField>
          <FormField id="gender" label="Gender" error={errors.gender}>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={selectBaseClasses}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </FormField>
          <FormField id="category" label="Category" error={errors.category}>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className={selectBaseClasses}>
              <option value="">Select Category</option>
              <option value="GN">GN</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </FormField>
        </div>
      </div>
    </fieldset>

    {/* --- Academic & Contact Section --- */}
    <fieldset>
      <legend className="text-lg font-semibold text-gray-800 mb-4">Academic & Contact Details</legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
         <FormField id="class" label="Class" error={errors.class}>
          <select id="class" name="class" value={formData.class} onChange={handleChange} className={selectBaseClasses}>
            <option value="">Select Class</option>
            {[...Array(12).keys()].map(i => <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>)}
             <option value="13">10+2 / Diploma</option>
          </select>
        </FormField>
        {/* --- ADDED SUBJECT SELECTOR --- */}
        <FormField id="subject" label="Subject" error={errors.subject}>
            <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className={selectBaseClasses}>
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="GS/GK">GS/GK</option>
                <option value="PCM">PCM</option>
                <option value="PCB">PCB</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
            </select>
        </FormField>
        <div className="md:col-span-2">
           <FormField id="school" label="School" error={errors.school}>
            <select id="school" name="school" value={formData.school} onChange={handleChange} className={selectBaseClasses}>
              <option value="">Select School</option>
              {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </FormField>
        </div>
         <FormField id="phone" label="Phone Number" error={errors.phone}>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputBaseClasses} />
         </FormField>
         <FormField id="aadharNumber" label="Aadhar Number (12 digits)" error={errors.aadharNumber}>
            <input type="text" id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className={inputBaseClasses} />
         </FormField>
      </div>
    </fieldset>
    
    <fieldset>
      <legend className="text-lg font-semibold text-gray-800 mb-4">Address Details</legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
        <FormField id="village" label="Village" error={errors.village}>
          <input type="text" id="village" name="village" value={formData.village} onChange={handleChange} className={inputBaseClasses} />
        </FormField>
        <FormField id="post" label="Post Office" error={errors.post}>
          <input type="text" id="post" name="post" value={formData.post} onChange={handleChange} className={inputBaseClasses} />
        </FormField>
        <FormField id="district" label="District" error={errors.district}>
          <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} className={inputBaseClasses} />
        </FormField>
        <FormField id="pinCode" label="Pin Code (6 digits)" error={errors.pinCode}>
          <input type="text" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange} className={inputBaseClasses} />
        </FormField>
        <div className="md:col-span-2">
          <FormField id="state" label="State" error={errors.state}>
            <select id="state" name="state" value={formData.state} onChange={handleChange} className={selectBaseClasses}>
                <option value="">Select State</option>
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
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
            </select>
          </FormField>
        </div>
      </div>
    </fieldset>
    
    <button type="button" onClick={nextStep} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
      Next: Payment →
    </button>
  </div>
);


// STEP 2 COMPONENT: PAYMENT DETAILS ------------------------------------------

const PaymentStep = ({ fee, formData, errors, handleChange, prevStep, isLoading }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-800 text-center">Payment Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-center">
        <img src="/images/qrcode.png" alt="QR Code for payment" className="w-36 h-36 md:w-48 md:h-48 rounded-lg shadow-md border" />
      </div>
      <div className="text-sm text-gray-700 space-y-2">
        <p><span className="font-semibold">Bank Name:</span> State Bank of India</p>
        <p><span className="font-semibold">Account Name:</span> Hill Rider Manav Sewa Samiti</p>
        <p><span className="font-semibold">Account Number:</span> 123456789012</p>
        <p><span className="font-semibold">IFSC Code:</span> SBIN0001234</p>
      </div>
    </div>

    <div className="p-4 rounded-md text-center bg-blue-100 text-blue-800">
      <span className="text-lg font-bold">Total Payable Fee: ₹{fee}</span>
    </div>

    <FormField id="transactionId" label="Enter UPI Transaction ID / Reference Number" error={errors.transactionId}>
      <input type="text" id="transactionId" name="transactionId" value={formData.transactionId} onChange={handleChange} className={inputBaseClasses} />
    </FormField>

    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
      <button type="button" onClick={prevStep} className="w-full sm:w-auto bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200">
        ← Back
      </button>
      <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200">
        {isLoading ? 'Submitting...' : 'Submit Registration'}
      </button>
    </div>
  </div>
);

// SUCCESS COMPONENT --------------------------------------------------------

const RegistrationSuccess = ({ student, schools, successMessage }) => {
  // Find the school name from the ID to pass to the receipt
  const schoolName = schools.find(s => s._id === student.school)?.name || "N/A";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 my-8">
      <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Success! You can now download your receipt.</p>
        <p>{successMessage}</p>
      </div>
      <RegistrationPrint 
        student={{...student, school: schoolName}} 
        registrationId={student.studentCode}
      />
    </div>
  );
};


// MAIN REGISTRATION COMPONENT ----------------------------------------------

export default function OlyRegistration({ languageType }) {
  // Multilingual content setup
  const content = {
    en: {
      title: "HR Olympiad Registration",
      successMsg: "Registration submitted for verification!",
      errorMsg: "Registration failed. Please try again."
    },
    hi: {
      title: "ओलंपियाड पंजीकरण",
      successMsg: "पंजीकरण सत्यापन के लिए जमा किया गया!",
      errorMsg: "पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।"
    },
  };
  const selectedContent = content[languageType] || content.en;

  // State Management
  const [formData, setFormData] = useState(initialFormData);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [feeConfig, setFeeConfig] = useState({});
  const [fee, setFee] = useState(0);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  
  // --- Effects for Data Fetching and Calculations ---

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get('https://hillrider.onrender.com/api/schools');
        setSchools(res.data);
      } catch (err) {
        console.error("Failed to fetch schools", err);
        setError('Could not load school list.');
      }
    };
    fetchSchools();
  }, []);

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

  useEffect(() => {
    const cls = formData.class;
    if (cls && feeConfig[cls] !== undefined) {
      const newFee = feeConfig[cls];
      setFee(newFee);
      setFormData(prev => ({ ...prev, amount: newFee }));
    }

    let competitionCategory = '';
    const classNum = parseInt(cls, 10);
    if (classNum >= 1 && classNum <= 5) competitionCategory = 'Primary';
    else if (classNum >= 6 && classNum <= 8) competitionCategory = 'Junior';
    else if (classNum >= 9 && classNum <= 10) competitionCategory = 'High-School';
    else if (classNum >= 11) competitionCategory = '10+2';
    setFormData(prev => ({ ...prev, competitionCategory }));
  }, [formData.class, feeConfig]);

  // --- Form Validation and Navigation ---

  const validateForm = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.class) newErrors.class = "Class is required";
      if (!formData.subject) newErrors.subject = "Subject is required"; // Added validation
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
      if (!/^\d{12}$/.test(formData.aadharNumber)) newErrors.aadharNumber = "Aadhar must be 12 digits";
      if (!/^\d{6}$/.test(formData.pinCode)) newErrors.pinCode = "Pincode must be 6 digits";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.school) newErrors.school = "School is required";
      if (!formData.village) newErrors.village = "Village is required";
      if (!formData.post) newErrors.post = "Post is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!photo) newErrors.photo = "Photo is required";
    }
    if (step === 2) {
      if (!formData.transactionId.trim()) newErrors.transactionId = "Transaction ID is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateForm()) setStep(2); };
  const prevStep = () => setStep(1);

  // --- Handlers ---

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    console.log("Form Data to submit", formData);
    try {
      let photoUrl = '';
      if (photo) {
        const photoFormData = new FormData();
        photoFormData.append('photo', photo);
        const uploadRes = await axios.post('https://hillrider.onrender.com/api/students/upload-photo', photoFormData);
        photoUrl = uploadRes.data.photoUrl;
      }

      const finalStudentData = { ...formData, photoUrl };
      const res = await axios.post("https://hillrider.onrender.com/api/students/register-payment", finalStudentData);
      
      setSuccessMessage(res.data.message || selectedContent.successMsg);
      setRegisteredStudent(res.data.student);
      
      // Reset form on success (the success view will be shown)
      setFormData(initialFormData);
      setPhoto(null);
      setPhotoPreview(null);
      setErrors({});
      
    } catch (err) {
      setError(err.response?.data?.message || selectedContent.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Logic ---

  if (registeredStudent) {
    return <RegistrationSuccess student={registeredStudent} schools={schools} successMessage={successMessage} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-2xl rounded-xl my-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">{selectedContent.title}</h2>
      
      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        <div className={`flex-1 text-center py-2 border-b-4 ${step === 1 ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400 transition-colors'}`}>
          <span className="font-semibold text-sm md:text-base">Step 1: Student Details</span>
        </div>
        <div className={`flex-1 text-center py-2 border-b-4 ${step === 2 ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400 transition-colors'}`}>
          <span className="font-semibold text-sm md:text-base">Step 2: Payment</span>
        </div>
      </div>

      {/* Global Error Display */}
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <StudentDetailsStep 
            formData={formData}
            errors={errors}
            schools={schools}
            photoPreview={photoPreview}
            handleChange={handleChange}
            handlePhotoChange={handlePhotoChange}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <PaymentStep
            fee={fee}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            prevStep={prevStep}
            isLoading={isLoading}
          />
        )}
      </form>
    </div>
  );
}