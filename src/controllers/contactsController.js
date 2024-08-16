import createHttpError from 'http-errors';
import * as contactsService from '../services/contactsServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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

export const createContact = async (req, res, next) => {
  try {
    const contactData = { ...req.body };
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    if (!req.user || !req.user._id) {
      return next(createHttpError(400, 'User ID is missing'));
    }

    contactData.userId = req.user._id;
    console.log('Contact data before file processing:', contactData);

    if (req.file) {
      const result = await saveFileToCloudinary(req.file.path);
      console.log('Cloudinary upload result:', result);

      contactData.photo = result.secure_url;
    }

    console.log('Contact data after file processing:', contactData);

    const createdContact = await contactsService.createContact(contactData);
    console.log('Created contact:', createdContact);

    res.status(201).send({
      status: 201,
      message: 'Successfully created a contact!',
      data: createdContact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    next(
      createHttpError(400, 'Error creating contact with photo', {
        cause: error,
      }),
    );
  }
};

export const changeContact = async (req, res, next) => {
  try {
    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    const { contactId } = req.params;
    const contactData = req.body;

    if (req.file) {
      console.log('File Path:', req.file.path);
      const result = await saveFileToCloudinary(req.file.path);
      contactData.photo = result.secure_url;

      if (req.file && req.file.path.startsWith('http')) {
        console.log(
          'Skipping local file deletion as the file is hosted externally.',
        );
      } else {
        await contactsService.deleteLocalFile(req.file.path);
      }
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
    console.error('Error updating contact:', error);
    next(
      createHttpError(400, 'Error updating contact with photo', {
        cause: error,
      }),
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
