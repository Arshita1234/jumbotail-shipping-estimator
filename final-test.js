require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testMongoDB() {
    console.log('=' .repeat(50));
    console.log('MONGODB CONNECTION TEST');
    console.log('=' .repeat(50));
    
    const uri = process.env.MONGODB_URI;
    console.log('Connection string (hidden password):', uri.replace(/:[^:@]*@/, ':****@'));
    
    const client = new MongoClient(uri, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000
    });
    
    try {
        console.log('\nAttempting to connect...');
        await client.connect();
        console.log('✅ CONNECTION SUCCESSFUL!');
        
        // Test database operations
        const db = client.db('jumbotail_db');
        console.log('\nTesting database operations:');
        
        // Try to create a collection
        await db.createCollection('test_collection');
        console.log('✅ Can create collections');
        
        // Try to insert data
        await db.collection('test_collection').insertOne({ test: 'data', timestamp: new Date() });
        console.log('✅ Can insert data');
        
        // Try to read data
        const data = await db.collection('test_collection').findOne({ test: 'data' });
        console.log('✅ Can read data');
        
        // Clean up
        await db.collection('test_collection').drop();
        console.log('✅ Can drop collections');
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('\nCollections in jumbotail_db:', collections.map(c => c.name));
        
        await client.close();
        console.log('\n✅ ALL TESTS PASSED! Your MongoDB is working perfectly!');
        
    } catch (error) {
        console.error('\n❌ CONNECTION FAILED!');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        if (error.errorResponse) {
            console.error('Error response:', error.errorResponse);
        }
    }
    console.log('=' .repeat(50));
}

testMongoDB().catch(console.error);