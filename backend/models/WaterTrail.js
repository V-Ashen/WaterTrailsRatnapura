const mongoose = require('mongoose');

// This defines the structure (Schema) of your hidden gems in the database
const waterTrailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true // e.g., "Waterfall", "River", "Natural Pool"
    },
    description: {
        type: String,
        required: true
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        nearestTown: { type: String, required: true }
    },
    navigationNotes: {
        type: String,
        required: true // Your special hidden road directions!
    },
    difficulty: {
        type: String,
        required: true
    },
    safetyLevel: {
        type: String,
        default: "Moderate" // e.g., "Safe", "Moderate", "Danger during Rain"
    },
    image: {
        type: String,
        required: true // We will store the Cloudinary URL here later
    }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' dates

// Export the model so we can use it in other files
module.exports = mongoose.model('WaterTrail', waterTrailSchema);