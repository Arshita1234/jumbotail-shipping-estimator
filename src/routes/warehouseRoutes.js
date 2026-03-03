const express = require('express');
const router = express.Router();
const { getNearestWarehouse } = require('../controllers/warehouseController');

router.get('/nearest', getNearestWarehouse);

module.exports = router;