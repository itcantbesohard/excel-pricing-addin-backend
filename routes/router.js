const express = require('express');
const router = express.Router();

const aiController = require('../controllers/aiController');
const pricelistController = require('../controllers/pricelistController');
const authMiddleware = require('../middleware/authMiddleware');

// AI endpoint
router.post('/ai',authMiddleware, aiController.handleAI);

// Pricelist endpoint
router.get('/pricelist', authMiddleware, pricelistController.getPricelist);

//PING
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = router;