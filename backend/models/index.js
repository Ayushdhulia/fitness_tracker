const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Diet = require('./Diet')(sequelize, DataTypes);
const Exercise = require('./Exercise')(sequelize, DataTypes);
const WaterLog = require('./WaterLog')(sequelize, DataTypes);

// Relationships
User.hasMany(Diet, { foreignKey: 'userId' });
Diet.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(WaterLog, { foreignKey: 'userId' });
WaterLog.belongsTo(User, { foreignKey: 'userId' });

// Workout Logs (User <-> Exercise many-to-many or separate model)
const WorkoutLog = sequelize.define('WorkoutLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sets: DataTypes.INTEGER,
  reps: DataTypes.INTEGER,
  weight: DataTypes.FLOAT,
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
});

User.hasMany(WorkoutLog, { foreignKey: 'userId' });
WorkoutLog.belongsTo(User, { foreignKey: 'userId' });

Exercise.hasMany(WorkoutLog, { foreignKey: 'exerciseId' });
WorkoutLog.belongsTo(Exercise, { foreignKey: 'exerciseId' });

module.exports = {
  sequelize,
  User,
  Diet,
  Exercise,
  WaterLog,
  WorkoutLog
};
