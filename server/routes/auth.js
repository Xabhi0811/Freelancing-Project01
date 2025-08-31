const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { validateRegistration, checkValidation } = require('../middleware/validation');
const { auth } = require('../middleware/auth');

// Register new user
router.post('/register', validateRegistration, checkValidation, register);

// Login user
router.post('/login', login);

// Get current user
router.get('/me', auth, getMe);

module.exports = router;