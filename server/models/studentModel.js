const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({    
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String, required: true }, // ADDED
    photoUrl: { type: String, default: '' }, // ADDED
    dateOfBirth: { type: Date, required: true },
    class: { type: String, required: true },
    phone: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    subject: { type: String, required: true },
    transactionId: { type: String, unique: true, sparse: true },
    aadharNumber: { type: String, unique: true },
    gender: {type:String, required:true, enum: ['Male', 'Female']},
    category: {type: String, require: true, enum: ['GN', 'OBC', 'ST', 'SC']},
    competitionCategory: {type: String, required:true, enum:['Primary', 'Junior', 'High-School', '10+2']},
    village: {type: String, required:true},
    post: {type: String, required:true},
    district: {type: String, required:true},
    pinCode: {type: String, required: true},
    state: {type: String, required:true, enum: [
    // States
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    // Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ]},
    
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unverified', 'Failed', 'Offline Paid'], 
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