import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { register, login, logout, refresh } from '../controllers/auth.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/auth/register',
  authenticate,
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

router.post(
  '/auth/login',
  authenticate,
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(login),
);

router.post('/auth/logout', authenticate, ctrlWrapper(logout));

router.post('/auth/refresh', authenticate, ctrlWrapper(refresh));

export default router;
