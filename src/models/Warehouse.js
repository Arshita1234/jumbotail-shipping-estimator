const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    warehouseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    capacity: Number,
    operatingHours: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);