const { User } = require('../models');

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findByPk(req.userData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const recommendations = {
      weight_loss: [
        { mealType: 'breakfast', foodName: 'Oatmeal with berries', calories: 300 },
        { mealType: 'lunch', foodName: 'Grilled Chicken Salad', calories: 450 },
        { mealType: 'dinner', foodName: 'Baked Salmon with Broccoli', calories: 500 },
        { mealType: 'snack', foodName: 'Greek Yogurt', calories: 150 }
      ],
      muscle_gain: [
        { mealType: 'breakfast', foodName: 'Scrambled Eggs with Toast', calories: 500 },
        { mealType: 'lunch', foodName: 'Beef Pasta with Vegetables', calories: 700 },
        { mealType: 'dinner', foodName: 'Steak with Sweet Potato', calories: 750 },
        { mealType: 'snack', foodName: 'Protein Shake and Nuts', calories: 300 }
      ],
      maintenance: [
        { mealType: 'breakfast', foodName: 'Avocado Toast with Egg', calories: 400 },
        { mealType: 'lunch', foodName: 'Turkey Sandwich with Salad', calories: 550 },
        { mealType: 'dinner', foodName: 'Chicken Stir-fry with Brown Rice', calories: 600 },
        { mealType: 'snack', foodName: 'Apple and Peanut Butter', calories: 200 }
      ]
    };

    const diet = recommendations[user.goal] || recommendations.maintenance;
    res.status(200).json(diet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
