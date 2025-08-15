const cookieParser = require('cookie-parser');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile
};