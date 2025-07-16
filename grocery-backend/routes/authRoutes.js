const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);              // Update profile
router.post('/change-password', auth, changePassword); // Change password

module.exports = router;
