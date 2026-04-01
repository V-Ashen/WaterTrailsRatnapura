const express = require('express');
const router = express.Router();
const { createTrail, getAllTrails } = require('../controllers/waterTrailController');

// When someone goes to /api/trails with a GET request, run getAllTrails
router.get('/', getAllTrails);

// When someone goes to /api/trails with a POST request, run createTrail
router.post('/', createTrail);

module.exports = router;