const express = require('express');
const router = express.Router();
const { editRegistraion,deleteRegistration, registerAdmin, getStudentById,loginAdmin, getAdminProfile,verifyToken,logoutAdmin } = require('../controllers/adminControl');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/get/:id', getStudentById);
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', authMiddleware, getAdminProfile);
router.put('/edit/:editingID',editRegistraion);
router.delete('/delete/:deleteID',deleteRegistration);
router.get('/verify-token',authMiddleware, verifyToken);
router.post("/logout", (req, res) => {
  res
    .clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none"
    })
    .json({ message: "Logged out" });
});
module.exports = router;