import createHttpError from 'http-errors';
import * as contactsService from '../services/contactsServices.js';
import { contactValidSchema } from '../validations/contactsValidation.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

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
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };

  try {
    const createdContact = await contactsService.createContact(contact);

    res.status(201).send({
      status: 201,
      message: 'Successfully created a contact!',
      data: createdContact,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const changeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contactData = req.body;

  try {
    const patchedContact = await contactsService.changeContact(
      contactId,
      contactData,
      req.user._id,
    );
    if (
      !patchedContact ||
      patchedContact.userId.toString() !== req.user._id.toString()
    ) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).send({
      status: 200,
      message: 'Successfully patched a contact!',
      data: patchedContact,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
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

    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    next(createHttpError(500, error.message));
  }
};
