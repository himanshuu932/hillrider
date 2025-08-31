import React, { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import html2pdf from 'html2pdf.js';

export default function AdmitCard({
  showControls = true,
  languageType = "en",
  isVisible = true,
  ngo = {
    name: "HILL RIDERS OLYMPIAD",
    logo: "/logo.png", 
    tagline: "Give your best, To rise above the rest",
    address: "Belawa Khurd, IOCL pump, Sonbasra Bazar, Gorakhpur, 273002",
    phone: "+91 7307605936",
    email: "hrmsewasamiti@gmail.com",
  },
  student = {
    firstName: "Priya",
    lastName: "Singh",
    dateOfBirth: "2010-09-22",
    class: "9th",
    phone: "9876543211",
    school: "Modern Heritage School",
    subject: "Science",
    rollNumber: "SC2025015",
    aadharNumber: "9876-5432-1098",
    gender: "Female",
    category: "OBC",
    competitionCategory: "Senior",
    village: "Civil Lines",
    post: "Main Post Office",
    district: "Prayagraj",
    pinCode: "211001",
    state: "Uttar Pradesh",
    photoUrl: "https://res.cloudinary.com/demo/image/upload/student_photos/sample.jpg", 
    signatureUrl: "https://via.placeholder.com/150x50/EEEEEE/808080?text=SIGN",
  },
  examDetails = null,
  preview = true,
  issuedAt = new Date(),
  registrationId = "SC2025015",
  documentTitle,
  onDownload,
}) {
  const printRef = useRef(null);
  const [showPreview, setShowPreview] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const t = useMemo(() => {
    const commonInstructions = {
        en: [
            "Please check all the details on the Admit Card carefully. In case of any discrepancy, contact the authorities immediately.",
            "This Admit Card must be presented for verification at the examination center along with a valid original photo ID (Aadhar Card).",
            "Candidates must reach the examination center by the reporting time.",
            "No candidate will be allowed entry after the gate closing time.",
            "Electronic devices such as mobile phones, smart watches, calculators, etc., are strictly prohibited inside the examination hall.",
            "Candidates must bring their own stationery (pen, pencil, etc.). Sharing of items is not permitted.",
            "Follow the instructions given by the invigilators.",
        ],
        hi: [
            "कृपया प्रवेश पत्र पर सभी विवरणों को ध्यान से देखें। किसी भी विसंगति के मामले में, तुरंत अधिकारियों से संपर्क करें।",
            "यह प्रवेश पत्र परीक्षा केंद्र पर सत्यापन के लिए एक वैध मूल फोटो पहचान पत्र (आधार कार्ड) के साथ प्रस्तुत किया जाना चाहिए।",
            "उम्मीदवारों को रिपोर्टिंग समय तक परीक्षा केंद्र पर पहुंचना होगा।",
            "गेट बंद होने के समय के बाद किसी भी उम्मीदवार को प्रवेश की अनुमति नहीं दी जाएगी।",
            "परीक्षा हॉल के अंदर मोबाइल फोन, स्मार्ट घड़ियाँ, कैलकुलेटर आदि जैसे इलेक्ट्रॉनिक उपकरण सख्त वर्जित हैं।",
            "उम्मीदवारों को अपनी स्टेशनरी (कलम, पेंसिल, आदि) स्वयं लानी होगी। वस्तुओं को साझा करने की अनुमति नहीं है।",
            "निरीक्षकों द्वारा दिए गए निर्देशों का पालन करें।",
        ],
    };
    const map = {
        en: { documentTitle: documentTitle || "ADMIT CARD", admitCardTitle: `ADMIT CARD `, rollNo: "ROLL NO.", candidate: "CANDIDATE'S DETAILS", examVenue: "EXAMINATION VENUE & SCHEDULE", downloadPdf: "Download PDF", downloading: "Downloading...", name: "Name", dob: "Date of Birth", gender: "Gender", category: "Category", phone: "Phone", aadhar: "Aadhar", address: "Address", school: "School", class: "Class", subject: "Subject", competitionCategory: "Competition", candidatePhoto: "Candidate's Photo", candidateSignature: "Candidate's Signature", examDate: "Date of Examination", reportingTime: "Reporting Time", gateClosing: "Gate Closing Time", examTime: "Examination Time", controllerSign: "Controller of Examinations", invigilatorSign: "Invigilator's Signature (To be signed in exam hall)", instructions: "IMPORTANT INSTRUCTIONS FOR THE CANDIDATE", instructionsList: commonInstructions.en, datetime: "Issued on" },
        hi: { documentTitle: documentTitle || "प्रवेश पत्र", admitCardTitle: `${examDetails?.examName || 'OLYMPIAD'} के लिए प्रवेश पत्र`, rollNo: "रोल नंबर", candidate: "अभ्यर्थी का विवरण", examVenue: "परीक्षा केंद्र और समय सारिणी", downloadPdf: "पीडीएफ डाउनलोड करें", downloading: "डाउनलोड हो रहा है...", name: "नाम", dob: "जन्म तिथि", gender: "लिंग", category: "श्रेणी", phone: "फ़ोन", aadhar: "आधार", address: "पता", school: "विद्यालय", class: "कक्षा", subject: "विषय", competitionCategory: "प्रतियोगिता", candidatePhoto: "अभ्यर्थी का फोटो", candidateSignature: "अभ्यर्थी का हस्ताक्षर", examDate: "परीक्षा की तारीख", reportingTime: "रिपोर्टिंग समय", gateClosing: "गेट बंद होने का समय", examTime: "परीक्षा का समय", controllerSign: "परीक्षा नियंत्रक", invigilatorSign: "निरीक्षक के हस्ताक्षर (परीक्षा हॉल में हस्ताक्षर किए जाने हैं)", instructions: "अभ्यर्थी के लिए महत्वपूर्ण निर्देश", instructionsList: commonInstructions.hi, datetime: "जारी करने की तारीख" },
    };
    return map[languageType] || map.en;
  }, [languageType, documentTitle, examDetails]);
  
  function safeVal(v, format = null) { if (v === null || v === undefined || v === "") return "N/A"; if (format === "date") { try { return new Date(v).toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); } catch { return String(v); } } return String(v); }
  const formattedDateTime = useMemo(() => { try { const d = new Date(issuedAt); return d.toLocaleDateString('en-GB') + " at " + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); } catch { return String(issuedAt); } }, [issuedAt]);

  const handleDownload = () => {
    setIsDownloading(true);
    const element = printRef.current;
    const studentName = `${student.firstName}_${student.lastName}`.replace(/\s+/g, '_');
    const fileName = `AdmitCard_${student.rollNumber}_${studentName}.pdf`;
    const opt = { margin: 0, filename: fileName, image: { type: 'jpeg', quality: 0.98 }, html2canvas:  { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().from(element).set(opt).save().then(() => { setIsDownloading(false); if (onDownload) onDownload(); });
  };
 
  const DetailRow = ({ label, value }) => (
    <div className="flex text-sm py-1">
      <p className="w-36 text-gray-500 shrink-0">{label}</p>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  );
  
  const TimingItem = ({ label, value, highlight = false }) => (
    <div className="text-center">
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`font-bold ${highlight ? 'text-red-600 text-base' : 'text-gray-800 text-sm'}`}>{value}</p>
    </div>
  );
 const hiddenStyle = {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
    height: '1px',
    width: '1px',
    overflow: 'hidden',
  };
  return (
    <div className={`bg-gray-200 print-container print:bg-white`}>
     
     {showControls && <div className="max-w-4xl mx-auto px-4 py-6 print:hidden">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-center items-center gap-4">
             <button onClick={handleDownload} disabled={isDownloading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 disabled:opacity-50"> 
              <Download className="w-4 h-4 mr-2" /> {isDownloading ? t.downloading : t.downloadPdf} </button>
          </div>
        </div>
      </div>
      }
      
     <div style={!isVisible ? hiddenStyle : {}} className="page-wrapper print:py-0">
        <div ref={printRef} className={`a4-page-container ${!showPreview ? "standard-view" : ""}`}>
          <div className="receipt-content bg-white p-6">
            
            <header className="flex items-start justify-between pb-4 border-b">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 shrink-0">
                   {ngo.logo ? <img src='/o.jpg' alt="NGO Logo" className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-200 rounded-md"></div> }
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{ngo.name}</h1>
                  <p className="text-sm text-gray-600">{ngo.tagline}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-gray-500">{t.rollNo}</p>
                <p className="text-xl font-bold text-gray-900 tracking-wider">{registrationId}</p>
              </div>
            </header>

            <main className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 tracking-wide uppercase mt-4 mb-4 text-center">{t.admitCardTitle}</h2>
              
              <div className="grid grid-cols-12 gap-6 border p-4 rounded-lg">
                <div className="col-span-8">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <div className="col-span-2"><DetailRow label={t.name} value={`${student.firstName} ${student.lastName}`} /></div>
                    <DetailRow label={t.dob} value={safeVal(student.dateOfBirth, "date").split(',')[1]?.trim()} />
                    <DetailRow label={t.gender} value={student.gender} />
                    <DetailRow label={t.category} value={student.category} />
                    <DetailRow label={t.phone} value={student.phone} />
                    <div className="col-span-2 pt-2 mt-2 border-t"> <DetailRow label={t.school} value={student.school} /> </div>
                    <DetailRow label={t.class} value={student.class} />
                    <DetailRow label={t.subject} value={student.subject} />
                  </div>
                </div>

                <div className="col-span-4 flex flex-col items-center">
                    <div className="w-32 h-40 border-2 border-gray-300 p-1 bg-gray-50 mb-2">
                        <img src={student.photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-40 h-12 border-2 border-gray-300 p-1 bg-gray-50 flex items-center justify-center">
                        <img src={student.signatureUrl} alt="Signature" className="h-10 object-contain" />
                    </div>
                </div>
              </div>
              
              {examDetails && (
                <section className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b uppercase tracking-wider">{t.examVenue}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border p-4 rounded-lg">
                      <div className="md:col-span-2">
                          <p className="font-bold text-base">{examDetails.center.name}</p>
                          <p className="text-sm text-gray-600">{examDetails.center.address}</p>
                      </div>
                      <div className="md:col-span-3 grid grid-cols-3 gap-2 border-t md:border-t-0 md:border-l pl-4 pt-4 md:pt-0">
                        <TimingItem label={t.reportingTime} value={examDetails.reportingTime} />
                        <TimingItem label={t.gateClosing} value={examDetails.gateClosingTime} highlight />
                        <TimingItem label={t.examTime} value={examDetails.examTime.split('-')[0].trim()} />
                      </div>
                    </div>
                    <p className="text-center text-xs font-semibold text-gray-600 mt-2">{t.examDate}: {safeVal(examDetails.date, "date")}</p>
                </section>
              )}

              <section className="mt-6 pt-4 border-t">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.instructions}</h3>
                  <ol className="list-decimal list-inside text-xs text-gray-600 space-y-1">
                      {t.instructionsList.map((inst, index) => <li key={index}>{inst}</li>)}
  
                  </ol>
              </section>

              {/* UPDATED: Increased top padding for a larger gap above signatures */}
              <div className="flex justify-between items-end pt-16 print:pt-12">
                <div className="w-56 border-t-2 border-dotted border-gray-400"></div>
                <div className="w-56 border-t-2 border-dotted border-gray-400"></div>
                <div className="w-56 border-t-2 border-dotted border-gray-400"></div>
              </div>

            </main>

            <footer className="mt-auto">
                <div className="text-center text-xs text-gray-500 font-medium border-t pt-3 mt-3">
                    {t.datetime}: {formattedDateTime}
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