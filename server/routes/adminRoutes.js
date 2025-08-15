const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminControl');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', authMiddleware, getAdminProfile);

module.exports = router;