const mongoose = require('mongoose');
require('dotenv').config();

const Customer = require('../models/Customer');
const Seller = require('../models/Seller');
const Warehouse = require('../models/Warehouse');
const TransportRate = require('../models/TransportRate');
const DeliverySpeed = require('../models/DeliverySpeed');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Clear existing data
        await Promise.all([
            Customer.deleteMany({}),
            Seller.deleteMany({}),
            Warehouse.deleteMany({}),
            TransportRate.deleteMany({}),
            DeliverySpeed.deleteMany({})
        ]);

        // Insert customers
        await Customer.insertMany([
            {
                customerId: 'CUST-123',
                name: 'Shree Kirana Store',
                phoneNumber: '9847******',
                location: { lat: 11.232, lng: 23.445495 }
            },
            {
                customerId: 'CUST-124',
                name: 'Andheri Mini Mart',
                phoneNumber: '9101******',
                location: { lat: 17.232, lng: 33.445495 }
            }
        ]);

        // Insert sellers
        await Seller.insertMany([
            {
                sellerId: 'SELL-123',
                name: 'Nestle Seller',
                location: { lat: 12.9716, lng: 77.5946 },
                products: [{
                    productId: 'PROD-456',
                    name: 'Maggie 500g Packet',
                    sellingPrice: 10,
                    attributes: { weight: 0.5 }
                }]
            },
            {
                sellerId: 'SELL-124',
                name: 'Rice Seller',
                location: { lat: 22.5726, lng: 88.3639 },
                products: [{
                    productId: 'PROD-457',
                    name: 'Rice Bag 10Kg',
                    sellingPrice: 500,
                    attributes: { weight: 10 }
                }]
            }
        ]);

        // Insert warehouses
        await Warehouse.insertMany([
            {
                warehouseId: 'WH-789',
                name: 'BLR_Warehouse',
                location: { lat: 12.99999, lng: 37.923273 }
            },
            {
                warehouseId: 'WH-790',
                name: 'MUMB_Warehouse',
                location: { lat: 11.99999, lng: 27.923273 }
            }
        ]);

        // Insert transport rates
        await TransportRate.insertMany([
            {
                mode: 'Aeroplane',
                minDistance: 500,
                maxDistance: Infinity,
                ratePerKmPerKg: 1
            },
            {
                mode: 'Truck',
                minDistance: 100,
                maxDistance: 499,
                ratePerKmPerKg: 2
            },
            {
                mode: 'Mini Van',
                minDistance: 0,
                maxDistance: 99,
                ratePerKmPerKg: 3
            }
        ]);

        // Insert delivery speeds
        await DeliverySpeed.insertMany([
            {
                name: 'Standard',
                baseCourierCharge: 10,
                extraChargePerKg: 0
            },
            {
                name: 'Express',
                baseCourierCharge: 10,
                extraChargePerKg: 1.2
            }
        ]);

        console.log('Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();