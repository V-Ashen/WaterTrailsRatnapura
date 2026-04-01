// 1. Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads your .env file

const waterTrailRoutes = require('./routes/waterTrailRoutes'); 
const authRoutes = require('./routes/authRoutes');

// 2. Initialize the app
const app = express();

// 3. Middleware (Allows your frontend to talk to your backend)
app.use(cors());
app.use(express.json());

// 4. Connect to MongoDB Atlas
const URL = process.env.MONGO_URI;

mongoose.connect(URL)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas (Ratnapura Database)!");
  })
  .catch((error) => {
    console.log("❌ Error connecting to database:", error);
  });

  app.use('/api/trails', waterTrailRoutes);
  app.use('/api/auth', authRoutes);
// 5. Basic Test Route
app.get('/', (req, res) => {
  res.send("Welcome to Water Trails Ratnapura API!");
});

// 6. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});