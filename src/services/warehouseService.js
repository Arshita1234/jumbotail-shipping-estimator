const Warehouse = require('../models/Warehouse');
const { calculateDistance } = require('../utils/geoUtils');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

class WarehouseService {
    async findNearestWarehouse(sellerLocation) {
        const cacheKey = `nearest_${sellerLocation.lat}_${sellerLocation.lng}`;
        const cachedResult = cache.get(cacheKey);
        
        if (cachedResult) return cachedResult;

        const warehouses = await Warehouse.find();
        let nearestWarehouse = null;
        let minDistance = Infinity;

        warehouses.forEach(warehouse => {
            const distance = calculateDistance(sellerLocation, warehouse.location);
            if (distance < minDistance) {
                minDistance = distance;
                nearestWarehouse = {
                    warehouseId: warehouse.warehouseId,
                    location: warehouse.location,
                    distance: distance
                };
            }
        });

        cache.set(cacheKey, nearestWarehouse);
        return nearestWarehouse;
    }
}

module.exports = new WarehouseService();