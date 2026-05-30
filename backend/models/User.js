module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT, // in cm
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT, // in kg
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true
    },
    goal: {
      type: DataTypes.ENUM('weight_loss', 'muscle_gain', 'maintenance'),
      allowNull: true
    },
    activityLevel: {
      type: DataTypes.ENUM('sedentary', 'light', 'moderate', 'active', 'very_active'),
      allowNull: true
    }
  });

  return User;
};
