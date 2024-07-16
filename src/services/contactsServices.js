import Contact from '../db/models/contactModel.js';

const getAllContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

export default {
  getAllContacts,
  getContactById,
};
