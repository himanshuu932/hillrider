// ReceiptModal.jsx

import React, { useState, useEffect } from "react";
import "./styles/modal.css";
import RegistrationReceipt from "../helpers/RegistrationPrint";
import AdmitCard from "../helpers/AdmitCard";

const ReceiptModal = ({ isOpen, onClose, languageType }) => {
  const [studentCode, setStudentCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceiptData] = useState(null);
  
   const [showReceipt, setShowReceipt] = useState(false);
  const [showAdmitCard, setShowAdmitCard] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStudentCode("");
        setPhone("");
        setLoading(false);
        setError("");
        setReceiptData(null);
         setShowReceipt(true); 
        setShowAdmitCard(true);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const resetModalState = () => {
    setStudentCode("");
    setPhone("");
    setLoading(false);
    setError("");
    setReceiptData(null);
    setShowReceipt(true);
    setShowAdmitCard(true);
  };

  const fetchReceipt = async () => {
    // ... (no changes in this function)
    if (!studentCode.trim() || !phone.trim()) {
      setError("Please enter a valid Student Code and Phone Number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/students/receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentCode, phone }),
      });
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

  const isPaymentConfirmed = receipt?.paymentStatus === 'Paid' || receipt?.paymentStatus === 'Offline Paid';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">&times;</button>
        {receipt ? (
          <div>
            {/* --- RECEIPT SECTION --- */}
            <div className="document-section">
              {/* ✨ CHANGE: Added a header with a toggle button */}
              <div className="document-header">
                <h3>Registration Receipt</h3>
                <button onClick={() => setShowReceipt(!showReceipt)} className="btn-toggle-view">
                  {showReceipt ? "Hide" : "Show"}
                </button>
              </div>
              <RegistrationReceipt
                languageType={languageType}
                student={receipt}
                registrationId={receipt.studentCode}
                issuedAt={receipt.createdAt}
                isVisible={showReceipt} 
              />
            </div>

            <hr className="section-divider" />

            {/* --- ADMIT CARD SECTION --- */}
            <div className="document-section">
              {/* ✨ CHANGE: Added a header with a toggle button */}
              <div className="document-header">
                <h3>Admit Card</h3>
                {isPaymentConfirmed && (
                    <button onClick={() => setShowAdmitCard(!showAdmitCard)} className="btn-toggle-view">
                        {showAdmitCard ? "Hide" : "Show"}
                    </button>
                )}
              </div>
              {(1==0) ? (
                <AdmitCard
                  student={receipt}
                  registrationId={receipt.studentCode}
                  issuedAt={receipt.createdAt}
                  
                  isVisible={showAdmitCard}
                />
              ) : (
                <div className="admit-card-notice">
                  <h4>Admit Card Not Generated Yet</h4>
                  <p>
                    Your Admit Card will be available here once your payment has been verified by the administration.
                  </p>
                </div>
              )}
            </div>
            
            <button onClick={resetModalState} className="btn modal-search-again">
              Search for Another
            </button>
          </div>
        ) : (
           // ... (no changes in the search form part)
          <div className="receipt-lookup-modal">
            <h3>Download Receipt & Admit Card</h3>
            <div className="receipt-lookup-form">
              <input type="text" value={studentCode} onChange={(e) => setStudentCode(e.target.value.toUpperCase())} placeholder="Enter Registration Code " className="receipt-input" disabled={loading} />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Registered Phone Number" className="receipt-input" disabled={loading} onKeyPress={(e) => e.key === 'Enter' && fetchReceipt()} />
              <button onClick={fetchReceipt} disabled={loading} className="btn"> {loading ? "Searching..." : "Submit"} </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptModal;