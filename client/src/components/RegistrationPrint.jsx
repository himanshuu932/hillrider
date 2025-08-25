import React, { useMemo, useRef } from "react";

export default function RegistrationReceipt({
  languageType = "en",
  ngo = {
    name: "HILL RIDER MANAV SEWA SAMITI",
    logo: null,
    tagline: "Serving Humanity with Dedication",
    address: "123 NGO Lane, Bhopal, MP",
    phone: "+91-9876543210",
    email: "contact@hillriderngo.org",
  },
  student = {
    firstName: "Aditi",
    lastName: "Sharma",
    dateOfBirth: "2011-06-15",
    class: "8th",
    phone: "9876543210",
    school: " Public School",
    subject: "Mathematics",
    transactionId: "TXN123456789",
    aadharNumber: "1234-5678-9012",
    gender: "Female",
    category: "GN",
    competitionCategory: "Junior",
    village: "Rampur",
    post: "post",
    district: "dictrict",
    pinCode: "462001",
    state: "state",
    paymentStatus: "Unverified",
    amount: 500,
    studentCode: "HR2025001",
  },
  registrationId = "HR-2025-001",
  issuedAt = new Date(),
  documentTitle,
}) {
  const printRef = useRef(null);

  const t = useMemo(() => {
    const map = {
      en: {
        documentTitle: documentTitle || "OLYMPIAD REGISTRATION",
        receiptTitle: "REGISTRATION ACKNOWLEDGMENT",
        regNo: "REG. NO.",
        studentId: "STUDENT ID",
        datetime: "DATE & TIME",
        candidate: "CANDIDATE INFORMATION",
        location: "ADDRESS DETAILS",
        academic: "ACADEMIC DETAILS",
        fees: "FEE DETAILS",
        printSave: "Print / Save as PDF",
        note: "Note: Payment verification will be done separately",
        keepSafe: "Please keep this receipt safe for future reference",
        footer: "*** COMPUTER GENERATED RECEIPT ***",
        amount: "Registration Fee",
        txnId: "Transaction Reference",
        status: "Verification Status",
      },
      hi: {
        documentTitle: documentTitle || "ओलंपियाड पंजीकरण",
        receiptTitle: "पंजीकरण रसीद",
        regNo: "पंजी. संख्या",
        studentId: "छात्र आईडी",
        datetime: "दिनांक व समय",
        candidate: "अभ्यर्थी की जानकारी",
        location: "पता विवरण",
        academic: "शैक्षणिक विवरण",
        fees: "फीस विवरण",
        printSave: "प्रिंट / पीडीएफ सेव करें",
        note: "नोट: भुगतान सत्यापन अलग से किया जाएगा",
        keepSafe: "भविष्य के संदर्भ के लिए इस रसीद को सुरक्षित रखें",
        footer: "*** कंप्यूटर जनरेटेड रसीद ***",
        amount: "पंजीकरण शुल्क",
        txnId: "लेनदेन संदर्भ",
        status: "सत्यापन स्थिति",
      },
    };
    return map[languageType] || map.en;
  }, [languageType, documentTitle]);

  function safeVal(v, format = null) {
    if (v === null || v === undefined) return "-";
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "object") return JSON.stringify(v);

    if (format === "date") {
      try {
        return new Date(v).toLocaleDateString();
      } catch {
        return String(v);
      }
    }

    if (format === "currency") {
      return `₹${Number(v).toLocaleString()}`;
    }

    return String(v);
  }

  const formattedDateTime = useMemo(() => {
    try {
      const d = new Date(issuedAt);
      return d.toLocaleDateString('en-IN') + " " + d.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return String(issuedAt);
    }
  }, [issuedAt]);

  const handlePrint = () => {
    const prev = document.title;
    document.title = `${t.documentTitle} - ${registrationId}`;
    window.print();
    setTimeout(() => (document.title = prev), 500);
  };

  return (
    <div id="receipt" ref={printRef} className="max-w-3xl mx-auto bg-white ...">
      <div className="min-h-screen bg-gray-50 py-6 px-4 print:bg-white print:py-0">
        <div className="max-w-2xl mx-auto mb-4 flex justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="px-6 py-2 rounded-md bg-[#0A3153] text-white font-medium shadow hover:bg-[#0A3153]/90 transition"
          >
            {t.printSave}
          </button>
        </div>

        <div
          ref={printRef}
          className="max-w-2xl mx-auto bg-white shadow-sm border-2 border-gray-800 print:shadow-none print:border-gray-800"
        >

          <div className="text-center p-4 border-b border-gray-300">
            {ngo.logo ? (
              <img
                src={ngo.logo}
                alt={`${ngo.name} logo`}
                className="w-16 h-16 mx-auto mb-3 object-contain"
              />
            ) : (
              <div className="w-16 h-16 mx-auto mb-3 bg-[#0A3153] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">HR</span>
              </div>
            )}
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {ngo.name || "Your NGO"}
            </h1>
            {ngo.tagline && (
              <p className="text-sm text-gray-600 mt-1">{ngo.tagline}</p>
            )}
            <div className="text-xs text-gray-500 mt-2 space-y-1">
              {ngo.address && <div>{ngo.address}</div>}
              <div className="flex justify-center space-x-4">
                {ngo.phone && <span>{ngo.phone}</span>}
                {ngo.email && <span>{ngo.email}</span>}
              </div>
            </div>
          </div>


          <div className="bg-gray-100 px-4 py-3 border-b-2 border-gray-800">
            <h2 className="text-center text-lg font-bold text-gray-800 tracking-wide">
              {t.receiptTitle}
            </h2>
          </div>

          <div className="p-4 bg-gray-50 border-b border-gray-300">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-600">{t.regNo}</span>
                <div className="text-lg font-bold text-gray-900">{registrationId}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-600">{t.studentId}</span>
                <div className="text-lg font-bold text-gray-900">{student.studentCode}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-600">{t.datetime}</span>
                <div className="text-sm font-bold text-gray-900">{formattedDateTime}</div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                {t.candidate}
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">Name:</span>
                  <span className="font-semibold">{student.firstName} {student.lastName}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">DOB:</span>
                  <span className="font-semibold">{safeVal(student.dateOfBirth, "date")}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">Gender:</span>
                  <span className="font-semibold">{student.gender}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">Category:</span>
                  <span className="font-semibold">{student.category}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">Phone:</span>
                  <span className="font-semibold">{student.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">Aadhar:</span>
                  <span className="font-semibold">{student.aadharNumber}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                {t.location}
              </h3>
              <div className="text-sm space-y-1">
                <div className="flex">
                  <span className="w-16 text-gray-600 font-medium">Village:</span>
                  <span className="font-semibold">{student.village}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-gray-600 font-medium">Post:</span>
                  <span className="font-semibold">{student.post}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-gray-600 font-medium">Address:</span>
                  <span className="font-semibold">{student.district}, {student.state} - {student.pinCode}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                {t.academic}
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex">
                  <span className="w-20 text-gray-600 font-medium">School:</span>
                  <span className="font-semibold">{student.school}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-600 font-medium">Class:</span>
                  <span className="font-semibold">{student.class}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-600 font-medium">Subject:</span>
                  <span className="font-semibold">{student.subject}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-600 font-medium">Category:</span>
                  <span className="font-semibold">{student.competitionCategory}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                {t.fees}
              </h3>
              <div className="bg-gray-50 p-3 rounded border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{t.amount}:</span>
                  <span className="text-lg font-bold text-gray-900">{safeVal(student.amount, "currency")}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-medium text-gray-700">{t.txnId}:</span>
                  <span className="font-mono text-gray-900">{student.transactionId}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-800 bg-gray-100 p-4">
            <div className="text-center space-y-2">
              <p className="text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-1 rounded">
                {t.note}
              </p>
              <p className="text-xs text-gray-600">{t.keepSafe}</p>
              <p className="text-xs font-bold text-gray-800">{t.footer}</p>
            </div>
          </div>
        </div>

        <style>{`
        @media print {
          @page { 
            size: A4; 
            margin: 15mm; 
          }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:bg-white { background: #fff !important; }
          .print\\:py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
          .print\\:border-gray-800 { border-color: #1f2937 !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      </div>
    </div>
  );
}