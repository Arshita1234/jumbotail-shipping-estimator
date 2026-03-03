const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
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
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);