const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const exerciseRoutes = require('./routes/exercise');
const dietRoutes = require('./routes/diet');
const waterRoutes = require('./routes/water');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // For development, allow all. In production, specify frontend URL.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Fitness Tracker API is running...');
});

// Database Sync and Server Start
const startServer = async () => {
  try {
    console.log('Attempting to sync database...');
    await sequelize.authenticate();
    console.log('Database connection established.');
    
    await sequelize.sync({ force: false });
    console.log('Database models synced.');

    // Seed exercises if table is empty
    const { Exercise } = require('./models');
    const exerciseCount = await Exercise.count();
    if (exerciseCount === 0) {
      console.log('Seeding initial exercises...');
      await seedExercises();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('CRITICAL: Unable to start server:', error);
  }
};


startServer();
