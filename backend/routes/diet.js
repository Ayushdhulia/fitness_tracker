const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');
const authMiddleware = require('../middleware/auth');

router.get('/recommendations', authMiddleware, dietController.getRecommendations);

module.exports = router;
