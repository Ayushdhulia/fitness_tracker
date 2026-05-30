const { Exercise } = require('../models');

const exercises = [
  { name: 'Pushups', bodyPart: 'Chest', difficulty: 'beginner', instructions: 'Place hands shoulder-width apart and lower body until chest touches floor.' },
  { name: 'Squats', bodyPart: 'Legs', difficulty: 'beginner', instructions: 'Stand with feet shoulder-width apart and lower hips as if sitting in a chair.' },
  { name: 'Pullups', bodyPart: 'Back', difficulty: 'intermediate', instructions: 'Grab a bar and pull your body up until your chin is over the bar.' },
  { name: 'Plank', bodyPart: 'Core', difficulty: 'beginner', instructions: 'Hold a pushup position but on your elbows for as long as possible.' },
  { name: 'Lunges', bodyPart: 'Legs', difficulty: 'beginner', instructions: 'Step forward with one leg and lower hips until both knees are bent at a 90-degree angle.' },
  { name: 'Bench Press', bodyPart: 'Chest', difficulty: 'intermediate', instructions: 'Lie on a bench and press a barbell up and down.' },
  { name: 'Deadlift', bodyPart: 'Full Body', difficulty: 'advanced', instructions: 'Lift a loaded barbell off the ground to the level of the hips, then lower it back.' },
  { name: 'Bicep Curls', bodyPart: 'Arms', difficulty: 'beginner', instructions: 'Curl weights towards your shoulders.' },
  { name: 'Shoulder Press', bodyPart: 'Shoulders', difficulty: 'intermediate', instructions: 'Press weights directly overhead.' }
];

const seedExercises = async () => {
  try {
    await Exercise.bulkCreate(exercises);
    console.log('Exercises seeded successfully!');
  } catch (error) {
    console.error('Error seeding exercises:', error);
  }
};

module.exports = seedExercises;
