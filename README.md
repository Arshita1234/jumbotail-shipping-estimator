# 🚚 Jumbotail E-Commerce Shipping Charge Estimator

A robust B2B e-commerce marketplace API for calculating shipping charges for Kirana stores, built with Node.js and MongoDB.

## 📋 Features

- ✅ Find nearest warehouse for any seller
- ✅ Calculate accurate shipping charges based on distance and weight
- ✅ Multiple transport modes (Aeroplane, Truck, Mini Van)
- ✅ Standard and Express delivery options
- ✅ Intelligent caching for faster responses
- ✅ Comprehensive error handling
- ✅ Unit tested

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Caching**: Node-cache
- **Testing**: Jest, Supertest
- **Security**: Helmet, CORS

## 📊 API Endpoints

### 1. Get Nearest Warehouse
```http
GET /api/v1/warehouse/nearest?sellerId=SELL-123&productId=PROD-456
