module.exports = (sequelize, DataTypes) => {
  const Diet = sequelize.define('Diet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mealType: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
      allowNull: false
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    protein: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    fats: DataTypes.FLOAT,
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  });

  return Diet;
};
