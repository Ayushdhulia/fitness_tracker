const { WaterLog } = require('../models');
const { Op } = require('sequelize');

exports.getTodayWater = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logs = await WaterLog.findAll({
      where: {
        userId: req.userData.userId,
        date: today
      }
    });
    const total = logs.reduce((sum, log) => sum + log.amount, 0);
    res.status(200).json({ total, logs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.logWater = async (req, res) => {
  try {
    const { amount } = req.body;
    const log = await WaterLog.create({
      userId: req.userData.userId,
      amount,
      date: new Date().toISOString().split('T')[0]
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
