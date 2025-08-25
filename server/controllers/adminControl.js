const cookieParser = require('cookie-parser');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel')

const registerAdmin = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            phone,
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('school');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const isEmail = /\S+@\S+\.\S+/.test(identifier);

        let admin;
        if (isEmail) {
            admin = await Admin.findOne({ email: identifier });
        } else {
            admin = await Admin.findOne({ phone: identifier });
        }

        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const Matched = await bcrypt.compare(password, admin.password);
        if (!Matched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Login successful',
            admin: {
                id: admin._id,
                email: admin.email,
                phone: admin.phone

            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRegistration = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.deleteID);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }
        res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

const editRegistraion = async (req, res) => {
    try {

        if (!req.params.editingID) {
            return res.status(400).json({ message: 'No student ID provided.' });
        }
        const student = await Student.findByIdAndUpdate(
            req.params.editingID,
            req.body,
            { new: true }
        ).populate('school', 'name code');
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }
        res.status(200).json({ message: 'Student updated successfully.', student });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    editRegistraion,
    deleteRegistration,
    getStudentById
};