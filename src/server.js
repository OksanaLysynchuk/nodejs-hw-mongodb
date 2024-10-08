import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contacts from './routers/contacts.js';
import authRouters from './routers/auth.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  const logger = pino();

  app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

  app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
      logger.info(`Response: ${res.statusCode} ${body}`);
      originalSend.call(this, body);
    };
    next();
  });

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

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use('/contacts', contacts);
  app.use('/auth', authRouters);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
