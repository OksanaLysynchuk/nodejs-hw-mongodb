import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsService from './routes/contacts.js';
import dotenv from 'dotenv';

dotenv.config();

const setupServer = () => {
  const app = express();
  const logger = pino();

  app.use(cors());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (contact) {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } else {
      res.status(404).json({
        message: 'Contact not found',
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
