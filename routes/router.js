import express from 'express';
const router = express.Router();
import { handleAI } from '../controllers/aiController.js';
import { handlePricelist } from '../controllers/pricelistController.js';
import requireAuth  from '../middleware/authMiddleware.js';

// AI endpoint
router.post('/ai',requireAuth, handleAI);

// Pricelist endpoint
router.get('/pricelist/:pricelistName', requireAuth, handlePricelist);

//PING
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export default router;