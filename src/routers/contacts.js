import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  changeContact,
  deleteContact,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  contactValidSchema,
  contactPatchSchema,
} from '../validations/contactsValidation.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactValidSchema),
  ctrlWrapper(createContact),
);

router.patch(
  '/contacts/:contactId',
  jsonParser,
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(changeContact),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  jsonParser,
  ctrlWrapper(deleteContact),
);

export default router;
