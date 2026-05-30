const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, exerciseController.getAllExercises);
router.get('/recommendations', authMiddleware, exerciseController.getRecommendations);
router.get('/bodypart/:part', authMiddleware, exerciseController.getByBodyPart);

module.exports = router;
