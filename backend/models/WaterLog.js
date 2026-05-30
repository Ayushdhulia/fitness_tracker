module.exports = (sequelize, DataTypes) => {
  const WaterLog = sequelize.define('WaterLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.INTEGER, // in ml
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  });

  return WaterLog;
};
