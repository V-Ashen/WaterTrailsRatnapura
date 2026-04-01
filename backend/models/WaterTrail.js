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
        type: {
            type: String,
            enum: ['Point'], // GeoJSON requirement
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Note: MongoDB requires [longitude, latitude] order!
            required: true
        },
        nearestTown: { type: String, required: true }
    },
    navigationNotes: {
        type: String,
        required: true // Offline cached hidden road directions
    },
    difficulty: {
        type: String,
        required: true
    },
    safetyLevel: {
        type: String,
        default: "Moderate" // "Safe", "Moderate", "Danger during Rain"
    },
    images: [{
        url: { type: String, required: true } // Cloudinary URL
    }]
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' dates

// Create the 2dsphere index! Essential for "$near" Geospatial Queries
waterTrailSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model('WaterTrail', waterTrailSchema);