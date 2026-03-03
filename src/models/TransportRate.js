const mongoose = require('mongoose');

const transportRateSchema = new mongoose.Schema({
    mode: { 
        type: String, 
        enum: ['Aeroplane', 'Truck', 'Mini Van'], 
        required: true 
    },
    minDistance: { type: Number, required: true },
    maxDistance: { type: Number, required: true },
    ratePerKmPerKg: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('TransportRate', transportRateSchema);