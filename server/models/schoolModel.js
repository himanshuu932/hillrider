const mongoose = require('mongoose');

// Schema for the School collection, now with a password
const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'School name is required.'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'School code is required.'],
        unique: true, // Ensures every school code is unique
        trim: true,
        uppercase: true
    },
    password: {
        type: String,
        required: [true, 'A password is required.'],
        unique: true 
    }
}, { timestamps: true });


const School = mongoose.model('School', SchoolSchema);
module.exports = School;
