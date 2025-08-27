import { useState, useEffect } from "react";
import RegistrationPrint from "./RegistrationPrint";

function ReceiptFetch({ studentCode }) {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentCode) return;

    const fetchReceipt = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://hillrider.onrender.com/api/students/receipt/${encodeURIComponent(studentCode)}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setReceipt(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [studentCode]);

  if (loading) return <p>Loading receipt...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!receipt) return null;

  return (
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
              firstName: receipt.firstName,
              lastName: receipt.lastName,
              dob: receipt.dateOfBirth,
              class: receipt.class,
              amount: receipt.amount,
              phone: receipt.phone,
              school: receipt.schoolName || "Unknown",
              subject: receipt.subject,
              transactionId: receipt.transactionId || "N/A",
              aadharNumber: receipt.aadharNumber,
              gender: receipt.gender,
              category: receipt.category,
              competitionCategory: receipt.competitionCategory,
              village: receipt.village,
              post: receipt.post,
              district: receipt.district,
              pinCode: receipt.pinCode,
              state: receipt.state,
              paymentStatus: receipt.paymentStatus || "Unverified",
              studentCode: receipt.studentCode,
            }}
            registrationId={receipt.studentCode}
            issuedAt={receipt.createdAt}
            documentTitle="Fetched Student Receipt"
          />
        </div>
      </div>
    </div>
  );
}

export default function ReceiptLookup() {
  const [studentCode, setStudentCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState(null);

  const handleSubmit = () => {
    if (!studentCode.trim()) return;
    setSubmittedCode(studentCode.trim());
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <div className="flex items-center gap-3">
        <input
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          type="text"
          placeholder="Enter Student Code"
          className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-[#333] text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Get Receipt
        </button>
      </div>

      {submittedCode && <ReceiptFetch studentCode={submittedCode} />}
    </div>
  );
}
