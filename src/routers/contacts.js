import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  changeContact,
  deleteContact,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactValidSchema } from '../validations/contactsValidation.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', authenticate, ctrlWrapper(getContacts));
router.get('/:contactId', authenticate, isValidId, ctrlWrapper(getContactById));

router.post(
  '/',
  authenticate,
  jsonParser,
  validateBody(contactValidSchema),
  ctrlWrapper(createContact),
);

router.post(
  '/photo',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(createContact),
);

router.patch(
  '/:contactId',
  authenticate,
  jsonParser,
  isValidId,
  validateBody(contactValidSchema),
  ctrlWrapper(changeContact),
);

router.patch(
  '/:contactId/photo',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(changeContact),
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  jsonParser,
  ctrlWrapper(deleteContact),
);

export default router;
