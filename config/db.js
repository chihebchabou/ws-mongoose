const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Connect to database
// const connectDB = () => {
//   mongoose
//     .connect(db)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => {
//       console.error('Could not connect to MongoDB', err);
//       process.exit(1);
//     });
// };

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
