const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);

module.exports = router;
