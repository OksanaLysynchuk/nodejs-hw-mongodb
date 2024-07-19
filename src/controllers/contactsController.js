import createHttpError from 'http-errors';
import * as contactsService from '../services/contactsServices.js';

export const getContacts = async (req, res) => {
  const contacts = await contactsService.getContacts();

  res.send({ status: 200, data: contacts });
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsService.getContactById(contactId);

  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
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

  const createdContact = await contactsService.createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

export const changeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contactData = req.body.contact;

  const patchedContact = await contactsService.changeContact(
    contactId,
    contactData,
  );

  console.log({ patchedContact });

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: patchedContact,
  });

  if (contactData === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await contactsService.deleteContact(contactId);

  res.status(204);

  if (deletedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
};
