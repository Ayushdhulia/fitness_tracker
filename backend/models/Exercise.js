module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bodyPart: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetMuscle: DataTypes.STRING,
    equipment: DataTypes.STRING,
    difficulty: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    instructions: DataTypes.TEXT,
    gifUrl: DataTypes.STRING
  });

  return Exercise;
};
