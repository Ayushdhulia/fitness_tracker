const { User } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userData.userId, {
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { height, weight, age, gender, goal, activityLevel } = req.body;
    const user = await User.findByPk(req.userData.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      height,
      weight,
      age,
      gender,
      goal,
      activityLevel
    });

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
