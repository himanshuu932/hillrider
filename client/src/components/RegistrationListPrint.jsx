import React, { useRef, useState } from "react";

const RegistrationListPrint = ({

    registrations,
    title = "Student Registration List",
    ngo = {
        name: "HILL RIDER MANAV SEWA SAMITI",
        logo: "/logo.png",
        tagline: "Serving Humanity with Dedication",
        address: "123 NGO Lane, Bhopal, MP",
        phone: "+91-9876543210",
        email: "contact@hillriderngo.org",
    },
    filters = {},
    generatedAt = new Date()
}) => {
    const getSchoolName = (school) => {
        if (!school) return "N/A";
        if (typeof school === 'object' && school.name) return school.name;
        return "Unknown";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN');
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            'Paid': 'bg-green-100 text-green-800',
            'Unverified': 'bg-yellow-100 text-yellow-800',
            'Offline Paid': 'bg-blue-100 text-blue-800'
        };
        return statusStyles[status] || 'bg-gray-100 text-gray-800';
    };

    const printRef = useRef(null);
    const [showPreview, setShowPreview] = useState(true);
    const printStyles = `
        @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
            .print-break { page-break-after: always; }
            table { font-size: 12px; }
            th, td { padding: 4px 6px; }
        }
    `;

    return (
        <div id="receipt" ref={printRef} >
            <div className={`bg-gray-200 print-container print:bg-white`}>
                <div className="bg-white p-8 max-w-full mx-auto">
                    <style>{printStyles}</style>

                    <div className="page-wrapper py-8 print:py-0">
                        <div ref={printRef} className={`a4-page-container ${!showPreview ? "standard-view" : ""}`}>
                            <div className="receipt-content bg-white p-8">

                                <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Student Code
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Student Name
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Phone
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    School
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Class
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Subject
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Registered On
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrations.map((registration, index) => (
                                                <tr key={registration._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {registration.firstName} {registration.lastName}
                                                            </div>
                                                            {registration.gender && (
                                                                <div className="text-xs text-gray-500">
                                                                    {registration.gender}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {registration.phone || 'N/A'}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {getSchoolName(registration.school)}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {registration.class || 'N/A'}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {registration.subject || 'N/A'}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(registration.paymentStatus)}`}>
                                                            {registration.paymentStatus}
                                                        </span>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {formatDate(registration.createdAt)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
                                    <p>This is a computer-generated document.</p>
                                    <p>Total Records: {registrations.length} | Generated by {ngo.name}</p>
                                </div>

                                <div className="no-print fixed bottom-4 right-4 space-x-2">
                                    <button
                                        onClick={() => window.print()}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-lg"
                                    >
                                        Print List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationListPrint;