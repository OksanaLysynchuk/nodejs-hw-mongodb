import createHttpError from 'http-errors';
import * as contactsService from '../services/contactsServices.js';

export const getContacts = async (req, res) => {
  const contacts = await contactsService.getContacts();

  res.send({
    status: 200,
    message: 'Contacts retrieved successfully',
    data: contacts,
  });
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
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
    );
    if (!patchedContact) {
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
    const deletedContact = await contactsService.deleteContact(contactId);

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
