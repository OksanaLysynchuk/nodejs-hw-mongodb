const mongoose = require('mongoose');
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://cluster0.mongodb.net:3000/contacts';

async function initMongoConnection() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

module.exports = { initMongoConnection };
