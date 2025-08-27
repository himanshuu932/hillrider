import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Clock } from 'lucide-react';

// --- START: MODIFIED COMPONENT ---
// It now receives props from the AdminPanel
const VerifyRegistrations = ({ unverifiedRegistrations, onVerificationSuccess }) => {
    // This component no longer needs its own loading or error state for fetching,
    // as the parent handles it.
    const [verifyingId, setVerifyingId] = useState(null);
    const [unverified, setUnverified] = useState(unverifiedRegistrations);

    // useEffect to update the local state when the prop changes
    useEffect(() => {
        setUnverified(unverifiedRegistrations);
    }, [unverifiedRegistrations]);

    // REMOVED: The fetchUnverified and its useEffect are no longer needed here.

    const handleVerify = async (studentId) => {
        setVerifyingId(studentId);
        try {
            await axios.patch(`https://hillrider.onrender.com/api/students/verify/${studentId}`);
            // Instead of filtering local state, call the function passed from the parent
            // to trigger a global data refresh.
            if (onVerificationSuccess) {
                onVerificationSuccess();
            }
        } catch (err) {
            alert('Verification failed. Please try again.');
            console.error(err);
        } finally {
            setVerifyingId(null);
        }
    };

    // The parent's loading/error states will prevent this component from rendering
    // if there's an issue, so we can remove the loading/error checks here.

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-white-800">Verify Online Payments</h3>
            {unverified.length === 0 ? (
                <div className="text-center py-10">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
                    <h3 className="mt-2 text-sm font-medium text-white-900">All caught up!</h3>
                    <p className="mt-1 text-sm text-white-500">There are no pending payments to verify.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white-200">
                        <thead className="bg-white-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase">School</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase">Transaction ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-white-200">
                            {unverified.map(reg => (
                                <tr key={reg._id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-white-900">{reg.firstName} {reg.lastName}</div>
                                        <div className="text-sm text-white-500">{reg.phone}</div>
                                    
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-700">{reg.studentCode || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-white-700">{reg.school?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm font-mono text-white-600">{reg.transactionId}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleVerify(reg._id)}
                                            disabled={verifyingId === reg._id}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300"
                                        >
                                            <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
                                            {verifyingId === reg._id ? 'Verifying...' : 'Verify'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VerifyRegistrations;