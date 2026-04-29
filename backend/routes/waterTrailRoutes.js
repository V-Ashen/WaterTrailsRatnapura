const express = require('express');
const router = express.Router();
const { createTrail, getAllTrails, getNearbyTrails, updateTrail, deleteTrail } = require('../controllers/waterTrailController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure multer to hold the file in RAM temporarily
const upload = multer({ storage: multer.memoryStorage() });

// GET /api/trails - Return all
router.get('/', getAllTrails);

// GET /api/trails/nearby - Return trails within radius using GeoJSON
router.get('/nearby', getNearbyTrails);

// POST /api/trails - Add new trail
router.post('/', protect, upload.single('image'), createTrail);

// PUT /api/trails/:id - Update existing trail
router.put('/:id', protect, upload.single('image'), updateTrail);

// DELETE /api/trails/:id - Delete an existing trail
router.delete('/:id', protect, deleteTrail);

module.exports = router;