const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');
const authMiddleware = require('../middleware/auth');

router.get('/today', authMiddleware, waterController.getTodayWater);
router.post('/log', authMiddleware, waterController.logWater);

module.exports = router;
