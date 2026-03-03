const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    sellerId: { type: String, required: true, unique: true },
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
    products: [{
        productId: String,
        name: String,
        sellingPrice: Number,
        attributes: {
            weight: Number,
            dimensions: {
                length: Number,
                width: Number,
                height: Number
            }
        }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Seller', sellerSchema);