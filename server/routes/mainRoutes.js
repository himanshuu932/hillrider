const express = require('express');
const router = express.Router();

// Import all the controller functions
const { 
    addSchool, 
    getSchools,
    registerStudentWithPayment,
    registerStudentByAdmin,
    getAllStudents,
    getUnverifiedStudents,
    verifyStudentPayment
} = require('../controllers/mainController');

// In a real-world application, you would protect admin-only routes
// with middleware like this:
// const { protectAdmin } = require('../middleware/authMiddleware');
// For now, the routes are left open for development purposes.


// --- School Routes ---

// @route   POST /api/schools/add
// @desc    Add a new school (Admin only)
// @access  Private
router.post('/schools/add', /* protectAdmin, */ addSchool);

// @route   GET /api/schools
// @desc    Get a list of all schools
// @access  Public
router.get('/schools', getSchools);


// --- Student Routes ---

// @route   POST /api/students/register-payment
// @desc    Register a student with a transaction ID (pending verification)
// @access  Public
router.post('/students/register-payment', registerStudentWithPayment);

// @route   POST /api/students/register-admin
// @desc    Register a student by an admin
// @access  Private
router.post('/students/register-admin', /* protectAdmin, */ registerStudentByAdmin);

// @route   GET /api/students
// @desc    Get all student registrations for the dashboard (Admin only)
// @access  Private
router.get('/students', /* protectAdmin, */ getAllStudents);

// @route   GET /api/students/unverified
// @desc    Get registrations pending verification (Admin only)
// @access  Private
router.get('/students/unverified', /* protectAdmin, */ getUnverifiedStudents);

// @route   PATCH /api/students/verify/:id
// @desc    Verify a student's payment (Admin only)
// @access  Private
router.patch('/students/verify/:id', /* protectAdmin, */ verifyStudentPayment);


module.exports = router;
