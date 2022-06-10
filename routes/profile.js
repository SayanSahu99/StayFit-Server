const { check } = require('express-validator');
const express = require('express');
const { updateProfile, getProfile } = require('../controllers/profileController');

const router = express.Router();

// @route GET consumptions/
// @desc Updates consumption list
router.get('/', getProfile);

// @route PUT consumptions/list
// @desc Updates consumption list
// @access Private
router.put('/',
    updateProfile
);

module.exports = router;