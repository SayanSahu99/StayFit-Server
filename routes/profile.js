const { check } = require('express-validator');
const express = require('express');
const { updateProfile, getProfile } = require('../controllers/profileController');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route GET consumptions/
// @desc Updates consumption list
router.get('/', auth, getProfile);

// @route PUT consumptions/list
// @desc Updates consumption list
// @access Private
router.post('/',
    auth,
    updateProfile
);

module.exports = router;