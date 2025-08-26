import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, ArrowLeft } from 'lucide-react';
import RegistrationReceipt from './RegistrationPrint';

const BulkReceiptPrint = ({ registrations, ngo, onClose }) => {
  const printContainerRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = () => {
    setIsDownloading(true);
    const element = printContainerRef.current;
    
    const opt = {
      margin: 0,
      filename: 'All_Student_Receipts.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
      html2pdf().from(element).set(opt).save().then(() => {
        setIsDownloading(false);
      });
    }, 500);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* CONTROLS - These will not be in the PDF */}
      <div className="p-4 bg-white shadow-md sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Bulk Receipt Preview ({registrations.length} Receipts)
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
              {isDownloading ? 'Generating PDF...' : 'Download All as PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* PRINTABLE CONTENT - Padding removed here */}
      <div ref={printContainerRef}>
        {registrations.map((student, index) => (
          <div key={student._id || index} className="receipt-page">
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
          </div>
        ))}
      </div>

      <style>{`
        /* Styles for forcing page breaks and fixing rendering issues */
        .receipt-page {
          page-break-after: always;
          overflow: hidden; 
        }
        
        /* CORRECTED: This prevents a blank page at the end */
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