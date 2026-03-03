const express = require('express');
const router = express.Router();
const { getShippingCharge, calculateCompleteShipping } = require('../controllers/shippingController');

router.get('/shipping-charge', getShippingCharge);
router.post('/shipping-charge/calculate', calculateCompleteShipping);

module.exports = router;