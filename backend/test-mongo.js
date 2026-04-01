const mongoose = require('mongoose');
const URI = "mongodb+srv://vihangaasen_db_user:e0nEVd4hDDuozIcE@cluster0.vib8wcb.mongodb.net/RatnapuraDB?appName=Cluster0";

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
