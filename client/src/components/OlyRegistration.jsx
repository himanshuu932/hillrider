import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/registration.css"; // Using the original stylesheet
import RegistrationPrint from "./RegistrationPrint";

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
        setError('Could not load school list.');
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    const fee = calculateFee(formData.class, formData.subject);
    setFormData(prev => ({ ...prev, amount: fee }));
  }, [formData.class, formData.subject]);

  // Input change handle function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit with new logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await axios.post("http://localhost:5000/api/students/register-payment", formData);
      setSuccessMessage(res.data.message || selectedContent.successMsg);
      setRegisteredStudent(res.data.student);
      setFormData({
        firstName: "", lastName: "", dateOfBirth: "", class: "",
        phone: "", amount: "", school: "", subject: "Mathematics", transactionId: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || selectedContent.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">
        <h2>{selectedContent.title}</h2>
      </div>

     
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="form-box" onSubmit={handleSubmit}>
        {/* Row 1: First + Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label>{selectedContent.firstName}</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{selectedContent.lastName}</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        {/* Row 2: DOB + Class */}
        <div className="form-row">
          <div className="form-group">
            <label>{selectedContent.dob}</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{selectedContent.class}</label>
            <input type="text" name="class" value={formData.class} onChange={handleChange} required />
          </div>
        </div>

        {/* Row 3: Phone */}
        <div className="form-group full-width">
          <label>{selectedContent.phone}</label>
          <input type="tel" name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
        </div>

        {/* Row 4: School Dropdown */}
        <div className="form-group full-width">
          <label>{selectedContent.school}</label>
          <select name="school" value={formData.school} onChange={handleChange} required>
            <option value="" disabled>{selectedContent.selectSchool}</option>
            {schools.length > 0 ? (
              schools.map(school => (
                <option key={school._id} value={school._id}>{school.name}</option>
              ))
            ) : (
              <option disabled>{selectedContent.loadingSchools}</option>
            )}
          </select>
        </div>

        {/* Row 5: Subject + Transaction ID */}
        <div className="form-row">
          <div className="form-group">
            <label>{selectedContent.subject}</label>
            <select name="subject" value={formData.subject} onChange={handleChange} required>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="form-group">
            <label>{selectedContent.transactionId}</label>
            <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group full-width">
          <label>Calculated Fee</label>
          <div className="font-bold text-green-700">
            ₹{formData.amount || 0}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Submitting...' : selectedContent.register}
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
}
