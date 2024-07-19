import { Contact } from '../db/models/contactModel.js';

export const getContacts = () => {
  return Contact.find();
};

export const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

export const createContact = (contact) => {
  return Contact.create(contact);
};

export const changeContact = (contactId, patchedContact) => {
  return Contact.findByIdAndUpdate(contactId, patchedContact, { new: true });
};

export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
