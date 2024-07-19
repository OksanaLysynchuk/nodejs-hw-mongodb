import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  const logger = pino();

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          fontSrc: ["'self'", 'https://nodejs-hw-mongodb-2g2p.onrender.com'],
        },
      },
    }),
  );
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
