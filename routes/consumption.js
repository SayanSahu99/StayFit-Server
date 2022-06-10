const { check } = require('express-validator');
const express = require('express');
const { updateConsumptionList, getConsumptionList, getConsumptionListByDate } = require('../controllers/consumptionListController');

const router = express.Router();

// @route GET consumptions/
// @desc Updates consumption list
router.get('/list', getConsumptionList);
router.get('/list/:date_string', getConsumptionListByDate);

// @route PUT consumptions/list
// @desc Updates consumption list
// @access Private
router.put('/list',
    check('consumptionList', 'Consumptions must be an array').isArray(),
    updateConsumptionList
);

module.exports = router;
