import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const initMongoConnection = async () => {
  const { MONGODB_URL } = process.env;

  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default initMongoConnection;
