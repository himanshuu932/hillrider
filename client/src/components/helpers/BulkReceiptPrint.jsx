import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, ArrowLeft } from 'lucide-react';
import RegistrationReceipt from './RegistrationPrint';
import AdmitCard from './AdmitCard';

const BulkReceiptPrint = ({ registrations, ngo, onClose, type = 'Receipt' }) => { // Default type to 'Receipt'
  const printContainerRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = () => {
    setIsDownloading(true);
    const element = printContainerRef.current;
    
    // Determine filename based on the type prop
    const isAdmitCard = type === 'AdmitCard';
    const fileName = isAdmitCard ? 'All_Student_Admit_Cards.pdf' : 'All_Student_Receipts.pdf';

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use a timeout to ensure the DOM is fully rendered before PDF generation
    setTimeout(() => {
      html2pdf().from(element).set(opt).save().then(() => {
        setIsDownloading(false);
      });
    }, 500);
  };

  const isAdmitCard = type === 'AdmitCard';

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* CONTROLS - These will not be in the PDF */}
      <div className="p-4 bg-white shadow-md sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
            {/* Dynamic Title */}
            Bulk {isAdmitCard ? 'Admit Card' : 'Receipt'} Preview ({registrations.length} Items)
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-wait"
            >
              <Download className="w-4 h-4 mr-2" />
               {/* Dynamic Button Text */}
              {isDownloading ? 'Generating PDF...' : `Download All ${isAdmitCard ? 'Admit Cards' : 'Receipts'}`}
            </button>
          </div>
        </div>
      </div>

      {/* PRINTABLE CONTENT - Renders the correct component based on type */}
      <div ref={printContainerRef}>
        {registrations.map((student, index) => (
          <div key={student._id || index} className="receipt-page">
            {isAdmitCard ? (
              <AdmitCard 
                showControls={false}
                ngo={ngo}
                student={{
                  ...student,
                  rollNumber: student.studentCode, // Map studentCode to rollNumber
                  school: student.school?.name || student.school || 'N/A',
                }}
                examDetails={student.examDetails || null} // Pass examDetails if available
                registrationId={student.studentCode || `REG-${index + 1}`}
                issuedAt={student.createdAt || new Date()}
                documentTitle="Student Admit Card"
              />
            ) : (
              <RegistrationReceipt
                showControls={false}
                ngo={ngo}
                student={{
                  ...student,
                  school: student.school?.name || student.school || 'N/A',
                }}
                registrationId={student.studentCode || `REG-${index + 1}`}
                issuedAt={student.createdAt || new Date()}
                documentTitle="Student Receipt"
              /> 
            )}
          </div>
        ))}
      </div>

      <style>{`
        .receipt-page {
          page-break-after: always;
          overflow: hidden; 
        }
        .receipt-page:last-child {
          page-break-after: auto;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body, html {
            background-color: #fff !important;
          }
          .receipt-page {
            border: none !important;
            box-shadow: none !important;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BulkReceiptPrint;