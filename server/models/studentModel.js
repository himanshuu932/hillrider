const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    // ... (other fields remain the same)
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    class: { type: String, required: true },
    phone: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    subject: { type: String, required: true },
    transactionId: { type: String, unique: true, sparse: true },
    
    // Updated paymentStatus enum
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unverified', 'Failed', 'Offline Paid'], // Changed 'Not Required'
        default: 'Unverified'
    },
    amount: { type: Number, required: true, default: 500 },
    studentCode: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
