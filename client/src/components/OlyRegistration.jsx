
import React, { useState } from "react";
import "../components/styles/registration.css";

export default function RegistrationForm({ languageType }) {
  const content = {
    en: {
      title: "HR Olympiad Registration",
      firstName: "First Name",
      lastName: "Last Name",
      age: "Age",
      class: "Class",
      phone: "Phone Number",
      school: "School",
      register: "Register Now",
      contact: "Offline Student Contact Us for Registration",
    },
    hi: {
      title: "ओलंपियाड पंजीकरण",
      firstName: "पहला नाम",
      lastName: "उपनाम",
      age: "आयु",
      class: "कक्षा",
      phone: "फ़ोन नंबर",
      school: "विद्यालय",
      register: "पंजीकरण करें",
      contact: "ऑफ़लाइन छात्र पंजीकरण हेतु संपर्क करें",
    },
  };

  const seletedContent = content[languageType] || content.en;

  // form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    class: "",
    phone: "",
    school: "",
  });

  // input change handle function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registration Successful");
        setFormData({ firstName: "", lastName: "", age: "", class: "", phone: "", school: "" });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">
        <h2>{seletedContent.title}</h2>
      </div>

      <form className="form-box" onSubmit={handleSubmit}>
        {/* Row 1: First + Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label>{seletedContent.firstName}</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{seletedContent.lastName}</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        {/* Row 2: Age + Class */}
        <div className="form-row">
          <div className="form-group">
            <label>{seletedContent.age}</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{seletedContent.class}</label>
            <input type="text" name="class" value={formData.class} onChange={handleChange} required />
          </div>
        </div>

        {/* Row 3: Phone */}
        <div className="form-group full-width">
          <label>{seletedContent.phone}</label>
          <input type="tel" name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
        </div>

        {/* Row 4: School */}
        <div className="form-group full-width">
          <label>{seletedContent.school}</label>
          <input type="text" name="school" value={formData.school} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">
          {seletedContent.register}
        </button>

        {/* contact text */}
        <label className="text">{seletedContent.contact}</label>
      </form>
    </div>
  );
}
