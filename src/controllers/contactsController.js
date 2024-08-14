import createHttpError from 'http-errors';
import * as contactsService from '../services/contactsServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

import * as fs from 'node:fs/promises';

export const getContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await contactsService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.send({
    status: 200,
    message: 'Contacts retrieved successfully',
    data: contacts,
  });
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsService.getContactById(
      contactId,
      req.user._id,
    );
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    if (contact.userId.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, 'Contact not allowed'));
    }
    res.send({
      status: 200,
      message: 'Contact retrieved successfully',
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

// export const createContact = async (req, res, next) => {
//   try {
//     const contactData = req.body;
//     if (req.file) {
//       const result = await saveFileToCloudinary(req.file.path);
//       contactData.photo = result.secure_url;
//       await fs.unlink(req.file.path);
//     }

//     contactData.userId = req.user._id;

//     const createdContact = await contactsService.createContact(contactData);

//     res.status(201).send({
//       status: 201,
//       message: 'Successfully created a contact!',
//       data: createdContact,
//     });
//   } catch (error) {
//     next(
//       createHttpError(400, 'Error creating contact with photo', error.message),
//     );
//   }
// };

// Створення контакту
console.log();

//------------------------------------------------------
// export const createContact = async (req, res, next) => {
//   try {
//     // const { _id: userId } = req.user; // Отримуємо userId з об'єкта користувача
//     console.log('req.user:', req.user);
//     const userId = req.user?._id;
//     if (!userId) {
//       throw new createHttpError(400, 'User ID is missing');
//     }
//     console.log('User ID:', userId);
//     console.log('req.user:', req.user);
//     console.log('Request Body:', req.body);
//     const { file } = req;
//     const photoUrl = file ? file.path : null;

//     console.log('Creating contact with data:', { ...req.body, photoUrl });

//     const contactData = {
//       userId,
//       name: req.body.name,
//       email: req.body.email,
//       phoneNumber: req.body.phoneNumber,
//       isFavourite: req.body.isFavourite || false,
//       contactType: req.body.contactType,
//       photo: photoUrl, // Перевірте, чи це поле називається photo у схемі
//     };

//     console.log('Contact before saving:', contact);

//     const createdContact = await contactsService.createContact(contactData);

//     res.status(201).json({
//       status: 201,
//       message: 'Successfully created a contact!',
//       data: createdContact,
//     });
//   } catch (error) {
//     console.error('Error creating contact:', error);
//     next(
//       createHttpError(500, 'Error creating contact with photo', error.message),
//     );
//   }
// };

export const createContact = async (req, res, next) => {
  const userId = req.user?._id;
  console.log('User ID from req.user:', userId);

  if (!userId) {
    return next(createHttpError(400, 'User ID is missing'));
  }

  try {
    const { file } = req;
    const photoUrl = file ? file.path : null;

    console.log('Creating contact with data:', {
      ...req.body,
      userId,
      photoUrl,
    });

    const contactData = {
      userId,
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      isFavourite: req.body.isFavourite || false,
      contactType: req.body.contactType,
      photoUrl: photoUrl,
    };

    const createdContact = await contactsService.createContact(contactData);

    res.status(201).send({
      status: 201,
      message: 'Successfully created a contact!',
      data: createdContact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    next(
      createHttpError(400, 'Error creating contact with photo', error.message),
    );
  }
};

export const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactData = req.body;

    if (req.file) {
      const result = await saveFileToCloudinary(req.file.path);
      contactData.photo = result.secure_url;
      await fs.unlink(req.file.path);
    }

    contactData.userId = req.user._id;

    const patchedContact = await contactsService.changeContact(
      contactId,
      contactData,
    );
    if (!patchedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: patchedContact,
    });
  } catch (error) {
    next(
      createHttpError(400, 'Error creating contact with photo', error.message),
    );
  }
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await contactsService.deleteContact(
      contactId,
      req.user._id,
    );

    console.log('Deleted Contact:', deletedContact);
    console.log('User ID:', req.user._id);

    if (
      !deletedContact ||
      deletedContact.userId.toString() !== req.user._id.toString()
    ) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).end();
  } catch (error) {
    console.error('Error:', error);
    next(createHttpError(500, error.message));
  }
};
