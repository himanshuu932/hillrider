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

    return (
        <div>
            <div id="receipt" ref={printRef}>
                <div className="bg-gray-200 print-container print:bg-white">
                    <style>{`
                @media print {
                    @page { size: A4; margin: 0; }
                    body, html { margin: 0 !important; padding: 0 !important; background-color: #fff !important; }
                    .print-container > * { display: none; }
                    .print-container .page-wrapper { display: block !important; }
                    .page-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0; }
                    .a4-page-container { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 100% !important; box-shadow: none !important; border: none !important; box-sizing: border-box; page-break-inside: avoid; }
                    .receipt-content { border: none !important; box-shadow: none !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
                }
            `}</style>
                    <div className="page-wrapper py-8 print:py-0">
                        <div ref={printRef} className="a4-page-container">
                            <div className="receipt-content bg-white p-8">
                                <header className="flex items-start justify-between pb-6 border-b">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 shrink-0">
                                            {ngo.logo ? <img src={ngo.logo} alt="NGO Logo" className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-200 rounded-md"></div>}
                                        </div>
                                        <div className="text-left">
                                            <h1 className="text-2xl font-bold text-gray-800">{ngo.name}</h1>
                                            <p className="text-sm text-gray-600">{ngo.tagline}</p>
                                            <p className="text-xs text-gray-500 mt-1">{ngo.address}</p>
                                            <p className="text-xs text-gray-500">Ph: {ngo.phone} | Email: {ngo.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right my-8">
                                        <p className="text-xs text-gray-500">Generated On</p>
                                        <p className="text-base font-bold text-gray-900">{formatDate(generatedAt)}</p>
                                    </div>
                                </header>
                                <main className="flex-grow">
                                    <h2 className="text-xl font-semibold text-gray-800 tracking-wide uppercase mb-0 text-center">{title}</h2>
                                    <div className="overflow-x-auto mt-6">
                                        <table className="min-w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Student Name</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">School</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Class</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Subject</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Registered On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {registrations.map((registration, index) => (
                                                    <tr key={registration._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td className="border border-gray-300 px-4 py-2 text-sm">{index + 1}</td>
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
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full`}>
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
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
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
    );
};

export default RegistrationListPrint;