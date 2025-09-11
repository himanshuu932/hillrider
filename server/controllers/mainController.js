const School = require('../models/schoolModel');
const Student = require('../models/studentModel');
const FeeConfig = require('../models/feeModel');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2; // ADDED
const fs = require('fs'); // ADDED

// --- NEW: Controller for handling photo uploads ---
/**
 * @desc    Upload student photo to Cloudinary
 * @route   POST /api/students/upload-photo
 * @access  Private (Admin)
 */
exports.uploadStudentPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'student_photos', // Optional: saves to a specific folder in Cloudinary
            resource_type: 'image',
        });

        // Clean up the temporarily stored file on the server
        fs.unlinkSync(req.file.path);

        // Send the secure URL back to the client
        res.status(200).json({
            message: 'Photo uploaded successfully!',
            photoUrl: uploadResult.secure_url,
        });

    } catch (error) {
        console.error('Error uploading photo to Cloudinary:', error);
        // If a file was uploaded but Cloudinary failed, try to clean it up
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Server error while uploading photo.' });
    }
};

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
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `HR/${year}/`;

    // Use an aggregation pipeline for correct numerical sorting
    const lastStudentArr = await Student.aggregate([
        // 1. Match only students from the current year
        { $match: { studentCode: { $regex: `^${prefix}` } } },

        // 2. Create a new field 'sequenceNumber' by converting the numeric part to an integer
        {
            $addFields: {
                sequenceNumber: {
                    $toInt: { $arrayElemAt: [{ $split: ["$studentCode", "/"] }, 2] }
                }
            }
        },

        // 3. Sort by the new numeric field in descending order
        { $sort: { sequenceNumber: -1 } },

        // 4. Get only the top result
        { $limit: 1 }
    ]);

    const lastStudent = lastStudentArr.length > 0 ? lastStudentArr[0] : null;
    console.log("Last Student Found:", lastStudent); // Debugging line

    let nextSequence = 1;
    if (lastStudent) {
        // The last sequence number is already in the 'sequenceNumber' field
        nextSequence = lastStudent.sequenceNumber + 1;
    }

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
        console.log("New Student Data:", newStudent); // Debugging line
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
/**
 * @desc    Register a student by an admin
 * @route   POST /api/students/register-admin
 * @access  Private (Admin)
 */
exports.registerStudentByAdmin = async (req, res) => {
    let studentSaved = false;
    let attempts = 0;
    const maxAttempts = 5; // Prevent an infinite loop

    while (!studentSaved && attempts < maxAttempts) {
        try {
            const studentCode = await generateStudentCode();
            const newStudent = new Student({
                ...req.body,
                studentCode,
                paymentStatus: 'Offline Paid',
            });
            await newStudent.save();
            studentSaved = true; // Mark as saved to exit the loop
            
            // Send success response only after successful save
            return res.status(201).json({
                message: `Student registered! Their unique code is ${studentCode}.`,
                student: newStudent
            });

        } catch (error) {
            // Check if it's the specific duplicate key error
            if (error.code === 11000 && error.keyPattern.studentCode) {
                console.log(`Duplicate studentCode generated. Retrying... Attempt ${attempts + 1}`);
                attempts++; // Increment attempts and loop again
            } else {
                // For any other error, break the loop and send an error response
                console.error('Error in student registration by admin:', error);
                return res.status(500).json({ message: 'Server error during registration.' });
            }
        }
    }

    // If the loop finishes without saving (e.g., too many failed attempts)
    if (!studentSaved) {
        return res.status(500).json({ message: 'Failed to register student after multiple attempts. Please try again later.' });
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

exports.addFeeConfig = async (req, res) => {
    try {
        const config = new FeeConfig(req.body);
        await config.save();
        res.status(201).json(config);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getFeeConfig = async (req, res) => {
    try {
        const feeConfig = await FeeConfig.findOne();
        if (!feeConfig) {
            return res.status(404).json({ message: "No fee config found" });
        }
        res.status(200).json(feeConfig);
    } catch (error) {
        console.error("error in getting fees:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateFeeConfig = async (req, res) => {
    try {
        const { className, amount } = req.body;
        const config = await FeeConfig.findOne();
        if (!config) return res.status(404).json({ message: "No fee config found" });

        config[className] = amount;
        await config.save();
        res.json(config);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// mainController.js

// ... (other controller functions)

exports.getReceipt = async(req, res)=>{
    try{
        const { studentCode, phone } = req.body; // Read from request body

        if (!studentCode || !phone) {
            return res.status(400).json({ message: "Student Code and Phone Number are required." });
        }

        // Find the student only if both studentCode and phone number match
        const student = await Student.findOne({ studentCode, phone });

        if(!student){
            // Provide a more helpful error message
            return res.status(404).json({ message: "No matching record found. Please check your Student Code and Phone Number." });
        }
        res.status(200).json(student);
    }
    catch(error){
        console.error("error in getting receipt:", error);
        res.status(500).json({ message: "An unexpected server error occurred." });
    }
}