const mongoose = require('mongoose');

const deliverySpeedSchema = new mongoose.Schema({
    name: { 
        type: String, 
        enum: ['Standard', 'Express'], 
        required: true 
    },
    baseCourierCharge: { type: Number, required: true },
    extraChargePerKg: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('DeliverySpeed', deliverySpeedSchema);