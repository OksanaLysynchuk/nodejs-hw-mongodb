const express = require('express');
const cors = require('cors');
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const {
  getContacts,
  getContactById,
} = require('./controllers/contactsController');

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = { setupServer };
