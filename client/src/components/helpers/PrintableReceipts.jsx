import React from 'react';
import RegistrationReceipt from './RegistrationPrint';

// This component is NEVER shown to the user on screen.
// It's a "template" that we will convert to HTML for the PDF.
const PrintableReceipts = ({ registrations, ngo }) => {
  return (
    <div>
      {/* This style block is directly inside the component to ensure
        it's included in the generated HTML for the PDF.
      */}
      <style>{`
        .receipt-page-for-print {
          page-break-after: always;
          overflow: hidden; 
        }
        .receipt-page-for-print:last-child {
          page-break-after: auto;
        }
      `}</style>
      
      {registrations.map((student, index) => (
        <div key={student._id || index} className="receipt-page-for-print">
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
  );
};

export default PrintableReceipts;