import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Clock } from 'lucide-react';

const VerifyRegistrations = () => {
    const [unverified, setUnverified] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [verifyingId, setVerifyingId] = useState(null);

    const fetchUnverified = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/students/unverified');
            setUnverified(res.data);
        } catch (err) {
            setError('Failed to fetch registrations for verification.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnverified();
    }, []);

    const handleVerify = async (studentId) => {
        setVerifyingId(studentId);
        try {
            await axios.patch(`http://localhost:5000/api/students/verify/${studentId}`);
            // Remove the verified student from the list in the UI
            setUnverified(prev => prev.filter(student => student._id !== studentId));
        } catch (err) {
            alert('Verification failed. Please try again.');
            console.error(err);
        } finally {
            setVerifyingId(null);
        }
    };

    if (loading) return <p className="text-center p-10">Loading pending verifications...</p>;
    if (error) return <p className="text-center p-10 text-red-500">{error}</p>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Verify Online Payments</h3>
            {unverified.length === 0 ? (
                <div className="text-center py-10">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">All caught up!</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no pending payments to verify.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {unverified.map(reg => (
                                <tr key={reg._id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{reg.firstName} {reg.lastName}</div>
                                        <div className="text-sm text-gray-500">{reg.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{reg.school?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{reg.transactionId}</td>
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
