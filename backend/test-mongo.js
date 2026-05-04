const mongoose = require('mongoose');
const URI = "url";

async function testConnection() {
    console.log("Attempting to connect to MongoDB Atlas...");
    try {
        await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 }); // Fail fast if blocked
        console.log("✅ SUCCESS! Mongoose connected to database!");
        process.exit(0);
    } catch (err) {
        console.error("❌ FAILED! Mongoose Error connecting:");
        console.error(err.message);
        process.exit(1);
    }
}
testConnection();
