const warehouseService = require('../services/warehouseService');
const Seller = require('../models/Seller');

const getNearestWarehouse = async (req, res) => {
    try {
        const { sellerId, productId } = req.query;

        if (!sellerId || !productId) {
            return res.status(400).json({
                error: 'Missing required parameters: sellerId and productId'
            });
        }

        const seller = await Seller.findOne({ sellerId });
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        const nearestWarehouse = await warehouseService.findNearestWarehouse(seller.location);

        res.json({
            warehouseId: nearestWarehouse.warehouseId,
            warehouseLocation: nearestWarehouse.location
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getNearestWarehouse };