import React, { useState, useEffect } from "react";
// Path updated to go one level up to find the 'helpers' directory
import "./styles/modal.css";
import RegistrationReceipt from "../helpers/RegistrationPrint";

const ReceiptModal = ({ isOpen, onClose, languageType }) => {
  const [studentCode, setStudentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceiptData] = useState(null);

  // Reset state when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStudentCode("");
        setLoading(false);
        setError("");
        setReceiptData(null);
      }, 300); // delay to allow for closing animation
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const resetModalState = () => {
    setStudentCode("");
    setLoading(false);
    setError("");
    setReceiptData(null);
  };

  const fetchReceipt = async () => {
    if (!studentCode.trim()) {
      setError("Please enter a valid Student Code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://hillrider.onrender.com/api/students/receipt/${encodeURIComponent(studentCode)}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Student not found.`);
      }
      const data = await res.json();
      setReceiptData(data);
    } catch (err) {
      setError(err.message);
      setReceiptData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">&times;</button>
        {receipt ? (
          <div>
            <RegistrationReceipt
              languageType={languageType}
               
              // This assumes your RegistrationReceipt component can take the student object directly
              student={receipt}
              registrationId={receipt.studentCode}
              issuedAt={receipt.createdAt}
            />
            <button onClick={resetModalState} className="btn modal-search-again">
              Search for Another Receipt
            </button>
          </div>
        ) : (
          <div className="receipt-lookup-modal">
            <h3>Registration Receipt</h3>
            <div className="receipt-lookup-form">
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value.toUpperCase())}
                placeholder="Enter Student Code (e.g., HR2025001)"
                className="receipt-input"
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && fetchReceipt()}
              />
              <button onClick={fetchReceipt} disabled={loading} className="btn">
                {loading ? "Searching..." : "Submit"}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptModal;