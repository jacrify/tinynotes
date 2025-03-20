const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (protected route)
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;
