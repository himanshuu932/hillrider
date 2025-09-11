import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Eye, X } from 'lucide-react';
import RegistrationReceipt from '../helpers/RegistrationPrint';// Adjust path if needed

const VerifyRegistrations = ({ unverifiedRegistrations, onVerificationSuccess }) => {
    const [verifyingId, setVerifyingId] = useState(null);
    const [unverified, setUnverified] = useState(unverifiedRegistrations);
    const [viewingReceipt, setViewingReceipt] = useState(null);
    // State to manage the modal's fade/slide transition
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setUnverified(unverifiedRegistrations);
    }, [unverifiedRegistrations]);

    // Effect to trigger the modal animation
    useEffect(() => {
        if (viewingReceipt) {
            // A short timeout allows the browser to render the modal before the transition starts
            const timer = setTimeout(() => setIsModalVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsModalVisible(false);
        }
    }, [viewingReceipt]);

    const handleVerify = async (studentId) => {
        setVerifyingId(studentId);
        try {
            await axios.patch(`https://hillrider.onrender.com/api/students/verify/${studentId}`);
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

    // Close handler that respects the exit animation
    const handleCloseModal = () => {
        setIsModalVisible(false);
        // Wait for the animation to finish before removing the modal from the DOM
        setTimeout(() => setViewingReceipt(null), 300); // Duration should match the transition
    };

    const mapRegToStudentData = (reg) => {
        if (!reg) return {};
        console.log("Mapping registration data:", reg.subject); // Debugging line
        return {
            firstName: reg.firstName || '',
            lastName: reg.lastName || '',
            fatherName: reg.fatherName || 'N/A',
            photoUrl: reg.photoUrl || '',
            dateOfBirth: reg.dateOfBirth,
            class: reg.class?.name || reg.class || 'N/A',
            phone: reg.phone || 'N/A',
            school: reg.school?.name || 'N/A',
            subject: reg.subject || 'N/A',
            transactionId: reg.transactionId || 'N/A',
            aadharNumber: reg.aadharNumber || 'N/A',
            gender: reg.gender || 'N/A',
            category: reg.category || 'N/A',
            competitionCategory: reg.competitionCategory || 'N/A',
            village: reg.address?.village || 'N/A',
            post: reg.address?.post || 'N/A',
            district: reg.address?.district || 'N/A',
            pinCode: reg.address?.pinCode || 'N/A',
            state: reg.address?.state || 'N/A',
            paymentStatus: "Paid",
            amount: reg.amount || 500,
            studentCode: reg.studentCode || 'N/A',
        };
    };

    return (
        <>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">School</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-white-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-white-200">
                                {unverified.map(reg => (
                                    <tr key={reg._id} className="hover:bg-white-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white-900">{reg.firstName} {reg.lastName}</div>
                                            <div className="text-sm text-white-500">{reg.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white-700">{reg.studentCode || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white-700">{reg.school?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white-600">{reg.transactionId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex items-center justify-center gap-3">
                                                {/* ## Improved View Button ## */}
                                                <button
                                                    onClick={() => setViewingReceipt(reg)}
                                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Eye className="-ml-1 mr-2 h-5 w-5" />
                                                    View
                                                </button>
                                                {/* ## Improved Verify Button ## */}
                                                <button
                                                    onClick={() => handleVerify(reg._id)}
                                                    disabled={verifyingId === reg._id}
                                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
                                                    {verifyingId === reg._id ? 'Verifying...' : 'Verify'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ## Modal with improved styling and animation ## */}
            {viewingReceipt && (
                <div
                    className={`fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 p-94 transition-opacity duration-300 ease-in-out bg-black ${isModalVisible ? 'bg-opacity-60' : 'bg-opacity-0'}`}
                    onClick={handleCloseModal}
                >
                    <div
                        className={`relative w-full max-w-4xl max-h-[90vh] transition-all duration-300 ease-in-out ${isModalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        onClick={e => e.stopPropagation()} // Prevent modal from closing on inner click
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-3 -right-3 z-20 bg-white rounded-full p-1.5 shadow-lg hover:bg-red-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        
                        <div className="bg-white-100 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
                           <RegistrationReceipt
                                key={viewingReceipt._id}
                                student={mapRegToStudentData(viewingReceipt)}
                                registrationId={viewingReceipt.registrationId || `${viewingReceipt.studentCode}`}
                                showControls={false}
                                isVisible={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerifyRegistrations;