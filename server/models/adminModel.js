const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }

});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
