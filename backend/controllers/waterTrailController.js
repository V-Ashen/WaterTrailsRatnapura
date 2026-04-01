const WaterTrail = require('../models/WaterTrail');

// 1. ADD a new Hidden Gem (POST)
const createTrail = async (req, res) => {
    try {
        const newTrail = new WaterTrail(req.body);
        const savedTrail = await newTrail.save();
        res.status(201).json(savedTrail);
    } catch (error) {
        res.status(400).json({ message: "Failed to add location", error: error.message });
    }
};

// 2. GET all Hidden Gems (GET)
const getAllTrails = async (req, res) => {
    try {
        const trails = await WaterTrail.find();
        res.status(200).json(trails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch locations", error: error.message });
    }
};

// 3. GET Nearby Hidden Gems (Geospatial Query $near)
const getNearbyTrails = async (req, res) => {
    try {
        // Look for lng, lat in the URL query string, e.g., /api/trails/nearby?lng=80.36&lat=6.77
        const { lng, lat, maxDistance = 5000 } = req.query; // Default 5000 meters = 5km

        if (!lng || !lat) {
            return res.status(400).json({ message: "Longitude and Latitude are required." });
        }

        const nearbyTrails = await WaterTrail.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)] // MongoDB needs [lng, lat]
                    },
                    $maxDistance: parseInt(maxDistance) 
                }
            }
        });

        res.status(200).json(nearbyTrails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch nearby locations", error: error.message });
    }
};

module.exports = { createTrail, getAllTrails, getNearbyTrails };