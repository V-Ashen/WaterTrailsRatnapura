const WaterTrail = require('../models/WaterTrail');

// 1. ADD a new Hidden Gem (POST)
const createTrail = async (req, res) => {
    try {
        const newTrail = new WaterTrail(req.body);
        const savedTrail = await newTrail.save();
        res.status(201).json(savedTrail); // 201 means "Created successfully"
    } catch (error) {
        res.status(400).json({ message: "Failed to add location", error: error.message });
    }
};

// 2. GET all Hidden Gems (GET)
const getAllTrails = async (req, res) => {
    try {
        const trails = await WaterTrail.find(); // Fetches everything from MongoDB
        res.status(200).json(trails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch locations", error: error.message });
    }
};

module.exports = { createTrail, getAllTrails };