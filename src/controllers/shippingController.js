const shippingService = require('../services/shippingService');
const warehouseService = require('../services/warehouseService');
const Customer = require('../models/Customer');
const Warehouse = require('../models/Warehouse');
const Seller = require('../models/Seller');
const { calculateDistance } = require('../utils/geoUtils');
const { validateDeliverySpeed } = require('../utils/validators');

const getShippingCharge = async (req, res) => {
    try {
        const { warehouseId, customerId, deliverySpeed } = req.query;

        if (!warehouseId || !customerId || !deliverySpeed) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        if (!validateDeliverySpeed(deliverySpeed)) {
            return res.status(400).json({ error: 'Invalid delivery speed' });
        }

        const customer = await Customer.findOne({ customerId }).lean();
        const warehouse = await Warehouse.findOne({ warehouseId }).lean();

        if (!customer || !warehouse) {
            return res.status(404).json({ error: 'Customer or warehouse not found' });
        }

        const distance = calculateDistance(warehouse.location, customer.location);
        const defaultWeight = 1;
        const shippingCharge = await shippingService.calculateShippingCharge(
            distance, defaultWeight, deliverySpeed
        );

        res.json({ shippingCharge });

    } catch (error) {
        console.error('Error in getShippingCharge:', error);
        res.status(500).json({ error: error.message });
    }
};

const calculateCompleteShipping = async (req, res) => {
    try {
        const { sellerId, customerId, deliverySpeed } = req.body;

        if (!sellerId || !customerId || !deliverySpeed) {
            return res.status(400).json({ 
                error: 'Missing required fields: sellerId, customerId, and deliverySpeed are required' 
            });
        }

        if (!validateDeliverySpeed(deliverySpeed)) {
            return res.status(400).json({ error: 'Invalid delivery speed. Use "standard" or "express"' });
        }

        // Find seller - use lean() to get plain JavaScript object
        const seller = await Seller.findOne({ sellerId }).lean();
        if (!seller) {
            return res.status(404).json({ error: `Seller with ID ${sellerId} not found` });
        }

        // Find customer - use lean() to get plain JavaScript object
        const customer = await Customer.findOne({ customerId }).lean();
        if (!customer) {
            return res.status(404).json({ error: `Customer with ID ${customerId} not found` });
        }

        // Validate locations
        if (!seller.location || !customer.location) {
            return res.status(400).json({ error: 'Location information missing for seller or customer' });
        }

        // Find nearest warehouse to seller
        const nearestWarehouse = await warehouseService.findNearestWarehouse(seller.location);
        
        // Get full warehouse details
        const warehouse = await Warehouse.findOne({ warehouseId: nearestWarehouse.warehouseId }).lean();
        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }

        // Calculate distance from warehouse to customer
        const distance = calculateDistance(warehouse.location, customer.location);
        
        // Calculate total weight from seller's products
        let totalWeight = 1; // default weight
        if (seller.products && seller.products.length > 0) {
            totalWeight = seller.products.reduce((sum, product) => {
                return sum + (product.attributes?.weight || 0);
            }, 0);
        }

        // Calculate shipping charge
        const shippingCharge = await shippingService.calculateShippingCharge(
            distance, totalWeight, deliverySpeed
        );

        // Send response
        res.json({
            shippingCharge,
            nearestWarehouse: {
                warehouseId: nearestWarehouse.warehouseId,
                warehouseLocation: nearestWarehouse.location
            }
        });

    } catch (error) {
        console.error('Error in calculateCompleteShipping:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getShippingCharge, calculateCompleteShipping };