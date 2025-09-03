import React, { useMemo, useRef, useState } from "react";
import { Printer, Download, Eye, EyeOff, Check, AlertCircle, Info } from "lucide-react";
import html2pdf from 'html2pdf.js';

export default function RegistrationReceipt({
   showControls = true,
  languageType = "en",
  isVisible = true,
  ngo = {
    name: "HILL RIDERS OLYMPIAD 2025",
    logo: "/logo.png",
    tagline: "Give your best to rise above the rest",
    address: "Belwa Khurd,Sonbrsa Bazar NH28,Gorakhpur 273002",
    phone: "+91 7307605936",
    email: "hrmsewasamiti@gmail.com",
  },
  student = {
    firstName: "Aditi",
    lastName: "Sharma",
    fatherName: "Ramesh Sharma",
    photoUrl: "", 
    dateOfBirth: "2011-06-15",
    class: "8th",
    phone: "9876543210",
    school: "Public School of Excellence",
    subject: "Mathematics",
    transactionId: "TXN123456789",
    aadharNumber: "1234-5678-9012",
    gender: "Female",
    category: "GN",
    competitionCategory: "Junior",
    village: "Rampur",
    post: "Post Office Rampur",
    district: "Bhopal",
    pinCode: "462001",
    state: "Madhya Pradesh",
    paymentStatus: "Paid",
    amount: 500,
    studentCode: "HR2025001",
  },
  registrationId = "HR-2025-001",
  issuedAt = new Date(),
  documentTitle,
  onPrint,
  onDownload,
  setPreviewr
}) {
  const printRef = useRef(null);
  const [showPreview, setShowPreview] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const t = useMemo(() => {
    const map = {
        en: { documentTitle: documentTitle || "OLYMPIAD REGISTRATION", receiptTitle: "REGISTRATION ACKNOWLEDGMENT", regNo: "REG. NO.", studentId: "STUDENT ID", datetime: "Issued on", candidate: "CANDIDATE DETAILS", fees: "FEE DETAILS", printReceipt: "Print", downloadPdf: "Download PDF", togglePreview: "Toggle Preview", previewMode: "A4 Preview", normalMode: "Web View", keepSafe: "Please keep this receipt safe for future reference.", footer: "This is a computer-generated receipt.", amount: "Registration Fee", txnId: "Transaction Reference", status: "Payment Status", name: "Name", fatherName: "Father's Name", dob: "Date of Birth", gender: "Gender", category: "Category", phone: "Phone", aadhar: "Aadhar", address: "Address", school: "School", class: "Class", subject: "Subject", competitionCategory: "Competition", printing: "Printing...", downloading: "Downloading...", authoritySign: "Authorised Signatory" },
        hi: { documentTitle: documentTitle || "ओलंपियाड पंजीकरण", receiptTitle: "पंजीकरण रसीद", regNo: "पंजी. संख्या", studentId: "छात्र आईडी", datetime: "जारी करने की तारीख", candidate: "अभ्यर्थी का विवरण", fees: "शुल्क विवरण", printReceipt: "प्रिंट करें", downloadPdf: "पीडीएफ डाउनलोड करें", togglePreview: "पूर्वावलोकन टॉगल करें", previewMode: "A4 पूर्वावलोकन", normalMode: "वेब देखें", keepSafe: "भविष्य के संदर्भ के लिए इस रसीद को सुरक्षित रखें।", footer: "यह एक कंप्यूटर जनित रसीद है।", amount: "पंजीकरण शुल्क", txnId: "लेन-देन संदर्भ", status: "भुगतान स्थिति", name: "नाम", fatherName: "पिता का नाम", dob: "जन्म तिथि", gender: "लिंग", category: "श्रेणी", phone: "फ़ोन", aadhar: "आधार", address: "पता", school: "विद्यालय", class: "कक्षा", subject: "विषय", competitionCategory: "प्रतियोगिता", printing: "प्रिंट हो रहा है...", downloading: "डाउनलोड हो रहा है...", authoritySign: "अधिकृत हस्ताक्षरकर्ता" },
    };
    return map[languageType] || map.en;
  }, [languageType, documentTitle]);
  
  function safeVal(v, format = null) { if (v === null || v === undefined || v === "") return "N/A"; if (format === "date") { try { return new Date(v).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return String(v); } } if (format === "currency") { return `₹${Number(v).toLocaleString("en-IN")}`; } return String(v); }
  const formattedDateTime = useMemo(() => { try { const d = new Date(issuedAt); return d.toLocaleDateString('en-GB') ; } catch { return String(issuedAt); } }, [issuedAt]);
  


  const handlePrint = () => { window.print(); if (onPrint) onPrint(); };
  const handleDownload = () => {
    
    setIsDownloading(true);
    const element = printRef.current;
    const studentName = `${student.firstName}_${student.lastName}`.replace(/\s+/g, '_');
    const fileName = `Receipt_${registrationId}_${studentName}.pdf`;
    const opt = { 
        margin: 0, 
        filename: fileName, 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas:  { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    html2pdf().from(element).set(opt).save().then(() => { setIsDownloading(false); if (onDownload) onDownload(); });
   
  };
   const hiddenStyle = {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
    height: '1px',
    width: '1px',
    overflow: 'hidden',
  };
  const DetailRow = ({ label, value }) => (
    <div className="flex text-sm py-1">
      <p className="w-36 text-gray-500 shrink-0">{label}</p>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  );

  return (
    <div className={`bg-gray-200 print-container print:bg-white`}>
     
     {showControls && <div className="max-w-4xl mx-auto px-4 py-6 print:hidden">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-center gap-4">
             <div className="flex justify-center items-center gap-4">
             <button onClick={handleDownload} disabled={isDownloading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 disabled:opacity-50"> 
              <Download className="w-4 h-4 mr-2" /> {isDownloading ? t.downloading : t.downloadPdf} </button>
              </div>
          </div>
        </div>
      </div>
      }
      
      <div style={!isVisible ? hiddenStyle : {}} className="page-wrapper    print:py-0">
        <div ref={printRef} className={`a4-page-container ${!showPreview ? "standard-view" : ""}`}>
          <div className="receipt-content bg-white p-6">
            
            {/* ADJUSTED FOR A4 FIT: Header bottom padding reduced to save space */}
            <header className="flex items-start justify-between pb-4 border-b">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 shrink-0">
                   {ngo.logo ? <img src='/o.jpg' alt="NGO Logo" className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-200 rounded-md"></div> }
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-gray-800">{ngo.name}</h1>
                  <p className="text-sm text-gray-600">{ngo.tagline}</p>
                  <p className="text-xs text-gray-500 mt-1">{ngo.address}</p>
                  <p className="text-xs text-gray-500">Ph: {ngo.phone} | Email: {ngo.email}</p>
                </div>
              </div>
                <div className="text-right my-8">
                <p className="text-xs text-gray-500">{t.regNo}</p>
                <p className="text-base font-bold text-gray-900">{registrationId}</p>
              </div>
            </header>

            <main className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 tracking-wide uppercase mt-4 mb-6 text-center">{t.receiptTitle}</h2>
              
              <div className="grid grid-cols-12 gap-8">
                <section className="col-span-8">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b uppercase tracking-wider">{t.candidate}</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <DetailRow label={t.name} value={`${student.firstName} ${student.lastName}`} />
                    <DetailRow label={t.fatherName} value={student.fatherName} />
                    <DetailRow label={t.dob} value={safeVal(student.dateOfBirth, "date")} />
                    <DetailRow label={t.gender} value={student.gender} />
                    <DetailRow label={t.category} value={student.category} />
                    <DetailRow label={t.phone} value={student.phone} />
                    <DetailRow label={t.aadhar} value={student.aadharNumber} />
                    <div className="col-span-2"> <DetailRow label={t.address} value={`${student.village}, ${student.post}, ${student.district}, ${student.state} - ${student.pinCode}`} /> </div>
                    <div className="col-span-2 pt-2 mt-2 border-t"> <DetailRow label={t.school} value={student.school} /> </div>
                    <DetailRow label={t.class} value={student.class} />
                    <DetailRow label={t.subject} value={student.subject} />
                    <DetailRow label={t.competitionCategory} value={student.competitionCategory} />
                    <DetailRow label={t.studentId} value={student.studentCode} />
                  </div>
                </section>

                <aside className="col-span-4 flex justify-center pt-12">
                   <div className="w-40 h-48 border-2 border-gray-300 flex items-center justify-center bg-gray-50">
                     {student.photoUrl ? (
                        <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover"/>
                     ) : (
                        <p className="text-sm text-gray-500">Photo</p>
                     )}
                   </div>
                </aside>
              </div>

              {/* ADJUSTED FOR A4 FIT: Top margin reduced slightly */}
              <section className="mt-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b uppercase tracking-wider">{t.fees}</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <DetailRow label={t.amount} value={<span className="text-lg font-bold">{safeVal(student.amount, "currency")}</span>} />
                    <DetailRow label={t.txnId} value={<span className="font-mono">{student.transactionId}</span>} />
                   
                    <DetailRow label={t.status} value={
                        <span className={`text-xs font-semibold px-2.5 py-1 `}>
                            {student.paymentStatus}
                        </span>
                    } />
                  </div>
                </section>
              
              {/* ===== SIGNATURE AND STAMP AREA ===== */}
              {/* ADJUSTED FOR A4 FIT: Top padding further reduced */}
              <div className="flex justify-end pt-8 print:pt-6">
                <div className="w-60 text-center">
                  <div className="h-20 flex justify-center items-center">
                    
                  </div>
                  <div className="border-t border-gray-500 mt-8"></div>
                  <p className="text-sm font-medium pt-2"></p>
                </div>
              </div>

            </main>

            {/* ADJUSTED FOR A4 FIT: Top padding reduced */}
            <footer className="text-center text-xs text-gray-500 pt-4 mt-auto">
                <p className="mb-2">{t.keepSafe}</p>
                <div className="flex justify-center items-center border-t pt-3">
                    <p className="font-medium">{t.datetime}: {formattedDateTime}</p>
                </div>
               
            </footer>
          </div>
        </div>
      </div>
      

      <style>{`
        .a4-page-container { width: 210mm; height: 291mm; margin: 0 auto; display: flex; flex-direction: column; background-color: white; box-shadow: 0 0 10px rgba(0,0,0,0.2); transition: all 0.3s ease; box-sizing: border-box; }
        .receipt-content { display: flex; flex-direction: column; width: 100%; height: 100%; box-sizing: border-box; }
        .standard-view { width: 100%; max-width: 896px; height: auto; box-shadow: none; }
        .standard-view .receipt-content { border-radius: 0.5rem; border: 1px solid #ddd; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
        @media print {
          @page { size: A4; margin: 0; }
          body, html { margin: 0 !important; padding: 0 !important; background-color: #fff !important; }
          .print-container > * { display: none; }
          .print-container .page-wrapper { display: block !important; }
          .page-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 90%; padding: 0; margin: 0; }
          .a4-page-container { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 90% !important; box-shadow: none !important; border: none !important; box-sizing: border-box; page-break-inside: avoid; }
          .receipt-content { border: none !important; box-shadow: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}