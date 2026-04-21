const express = require('express');
const multer = require('multer');
const { analyzeImage } = require('../controllers/analyzeController');

const router = express.Router();

// Memory storage keeps image buffer in memory. Ideal for forwarding or processing directly
const upload = multer({ storage: multer.memoryStorage() });

// Image Upload API
router.post('/analyze', upload.single('image'), analyzeImage);

module.exports = router;
