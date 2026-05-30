const { Sequelize } = require('sequelize');
const path = require('path');

// Switching to SQLite for zero-config and reliability
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

module.exports = sequelize;
