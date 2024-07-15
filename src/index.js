import dotenv from 'dotenv';
import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB, PORT } =
  process.env;

initMongoConnection()
  .then(() => {
    setupServer();
  })
  .catch((error) => {
    console.error('Failed to initialize server:', error);
  });
