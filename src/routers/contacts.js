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
  patchContactSchema,
} from '../validations/contactsValidation.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post(
  '/',
  upload.single('photo'),
  validateBody(contactValidSchema),
  ctrlWrapper(createContact),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(patchContactSchema),
  ctrlWrapper(changeContact),
);

router.delete('/:contactId', isValidId, jsonParser, ctrlWrapper(deleteContact));

export default router;
