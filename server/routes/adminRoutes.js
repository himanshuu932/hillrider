const express = require('express');
const router = express.Router();
const { editRegistraion,deleteRegistration, registerAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminControl');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', authMiddleware, getAdminProfile);
router.put('/edit/:editingID',editRegistraion);
router.delete('/delete/:deleteID',deleteRegistration);
module.exports = router;