const TransportRate = require('../models/TransportRate');
const DeliverySpeed = require('../models/DeliverySpeed');
const { getTransportMode } = require('../utils/geoUtils');

class ShippingService {
    async calculateShippingCharge(distance, weight, deliverySpeed) {
        const transportMode = getTransportMode(distance);
        const transportRate = await TransportRate.findOne({ mode: transportMode });
        
        const baseShippingCharge = distance * weight * transportRate.ratePerKmPerKg;
        const deliveryConfig = await DeliverySpeed.findOne({ 
            name: deliverySpeed.charAt(0).toUpperCase() + deliverySpeed.slice(1) 
        });

        let totalCharge = baseShippingCharge + deliveryConfig.baseCourierCharge;
        
        if (deliverySpeed.toLowerCase() === 'express') {
            totalCharge += weight * deliveryConfig.extraChargePerKg;
        }

        return Math.round(totalCharge * 100) / 100;
    }

    calculateTotalWeight(products) {
        return products.reduce((total, product) => {
            return total + (product.attributes?.weight || 0);
        }, 0);
    }
}

module.exports = new ShippingService();