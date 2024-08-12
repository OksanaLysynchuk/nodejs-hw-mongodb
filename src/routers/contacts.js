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
  upload.single('photo'),
  jsonParser,
  validateBody(contactValidSchema),
  ctrlWrapper(createContact),
);

router.patch(
  '/:contactId',
  authenticate,
  upload.single('photo'),
  jsonParser,
  isValidId,
  validateBody(contactValidSchema),
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
