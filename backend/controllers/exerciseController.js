const { Exercise, User } = require('../models');

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getByBodyPart = async (req, res) => {
  try {
    const { part } = req.params;
    const exercises = await Exercise.findAll({ where: { bodyPart: part } });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findByPk(req.userData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let difficulty = 'beginner';
    if (user.activityLevel === 'active' || user.activityLevel === 'very_active') {
      difficulty = 'intermediate';
    }

    const exercises = await Exercise.findAll({
      where: { difficulty },
      limit: 6
    });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
