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

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      data: contact,
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
