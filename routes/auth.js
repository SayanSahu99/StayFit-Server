const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Login Users
router.post('/login', authController.authLogin);

// Register Users
router.post('/register', authController.authRegister);

module.exports = router; 