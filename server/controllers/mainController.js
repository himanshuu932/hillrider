const School = require('../models/schoolModel');
const Student = require('../models/studentModel');
const crypto = require('crypto');

// --- School Controller Functions ---

/**
 * @desc    Add a new school with a dynamically generated code and password
 * @route   POST /api/schools/add
 * @access  Private (Admin)
 */
exports.addSchool = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Please provide a school name.' });
        }

        // Case-insensitive check for existing school name
        const existingSchool = await School.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingSchool) {
            return res.status(409).json({ message: 'A school with this name already exists.' });
        }

        // Dynamic code generation (e.g., HR2025/01)
        const currentYear = new Date().getFullYear();
        const prefix = `HR${currentYear}/`;
        const lastSchool = await School.findOne({ code: new RegExp(`^${prefix}`) }).sort({ code: -1 });
        let nextSequence = lastSchool ? parseInt(lastSchool.code.split('/')[1], 10) + 1 : 1;
        const generatedCode = `${prefix}${String(nextSequence).padStart(2, '0')}`;
        
        // Unique random password generation
        let password;
        let isPasswordUnique = false;
        while (!isPasswordUnique) {
            password = crypto.randomBytes(4).toString('hex');
            const schoolWithPassword = await School.findOne({ password });
            if (!schoolWithPassword) {
                isPasswordUnique = true;
            }
        }

        const school = new School({ 
            name, 
            code: generatedCode,
            password 
        });
        await school.save();

        res.status(201).json({ message: 'School added successfully!', school });

    } catch (error) {
        console.error('Error adding school:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'A duplicate code or password was generated. Please try again.' });
        }
        res.status(500).json({ message: 'Server error while adding school.' });
    }
};

/**
 * @desc    Get all schools
 * @route   GET /api/schools
 * @access  Public
 */
exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find({}).sort({ name: 1 });
        res.status(200).json(schools);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ message: 'Server error while fetching schools.' });
    }
};

// --- Helper Function to Generate Student Code (UPDATED) ---
const generateStudentCode = async () => {
    // Get the last two digits of the current year (e.g., 2025 -> '25')
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `HR/${year}/`;

    // Find the last student registered this year, regardless of school
    const lastStudent = await Student.findOne({ studentCode: new RegExp(`^${prefix}`) })
                                     .sort({ studentCode: -1 });

    let nextSequence = 1;
    if (lastStudent) {
        // Extract the sequence number from the code (e.g., "HR/25/12" -> 12)
        const lastSequence = parseInt(lastStudent.studentCode.split('/')[2], 10);
        nextSequence = lastSequence + 1;
    }

    // Return the new code, e.g., "HR/25/13"
    return `${prefix}${nextSequence}`;
};


// --- Student Registration & Verification Controller Functions ---

/**
 * @desc    Register a student with payment - saves as 'Unverified'
 * @route   POST /api/students/register-payment
 * @access  Public
 */
exports.registerStudentWithPayment = async (req, res) => {
    try {
        const { transactionId } = req.body;
        if (!transactionId) {
            return res.status(400).json({ message: 'Transaction ID is required.' });
        }

        // Generate the code without needing the school ID
        const studentCode = await generateStudentCode();

        const newStudent = new Student({
            ...req.body,
            studentCode,
            paymentStatus: 'Unverified' 
        });

        await newStudent.save();
        res.status(201).json({ 
            message: `Registration submitted! Your unique code is ${studentCode}. Please save it for future reference.`, 
            student: newStudent 
        });

    } catch (error) {
        console.error('Error in student registration with payment:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'This transaction ID has already been used.' });
        }
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

/**
 * @desc    Register a student by an admin
 * @route   POST /api/students/register-admin
 * @access  Private (Admin)
 */
exports.registerStudentByAdmin = async (req, res) => {
    try {
        const studentCode = await generateStudentCode();
        const newStudent = new Student({
            ...req.body,
            studentCode,
            paymentStatus: 'Offline Paid', // <-- UPDATED STATUS
            transactionId: null 
        });
        await newStudent.save();
        res.status(201).json({ 
            message: `Student registered! Their unique code is ${studentCode}.`, 
            student: newStudent 
        });
    } catch (error) {
        console.error('Error in student registration by admin:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

/**
 * @desc    Get all student registrations for the dashboard
 * @route   GET /api/students
 * @access  Private (Admin)
 */
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}).populate('school', 'name code').sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Server error while fetching students.' });
    }
};

/**
 * @desc    Get all unverified student registrations for the verification page
 * @route   GET /api/students/unverified
 * @access  Private (Admin)
 */
exports.getUnverifiedStudents = async (req, res) => {
    try {
        const students = await Student.find({ paymentStatus: 'Unverified' })
            .populate('school', 'name code')
            .sort({ createdAt: 1 });
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching unverified students:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

/**
 * @desc    Verify a student's payment by updating their status to 'Paid'
 * @route   PATCH /api/students/verify/:id
 * @access  Private (Admin)
 */
exports.verifyStudentPayment = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { paymentStatus: 'Paid' },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Payment verified successfully!', student });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
