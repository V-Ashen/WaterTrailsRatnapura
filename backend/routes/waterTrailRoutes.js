const express = require('express');
const router = express.Router();
const { createTrail, getAllTrails, getNearbyTrails } = require('../controllers/waterTrailController');

// GET /api/trails - Return all
router.get('/', getAllTrails);

// GET /api/trails/nearby - Return trails within radius using GeoJSON
router.get('/nearby', getNearbyTrails);

// POST /api/trails - Add new trail
router.post('/', createTrail);

module.exports = router;