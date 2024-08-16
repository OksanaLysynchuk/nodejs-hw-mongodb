import Contact from '../db/models/contactModel.js';
import * as fs from 'fs/promises';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.type) {
    contactQuery.where('contactType').eq(filter.type);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').eq(filter.isFavourite);
  }

  contactQuery.where('userId').eq(userId);

  contactQuery
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const [contacts, totalItems] = await Promise.all([
    contactQuery.exec(),
    Contact.countDocuments(contactQuery.getQuery()),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const createContact = (contact) => {
  console.log('Creating contact with:', contact);
  console.log('User ID:', contact.userId);
  return Contact.create(contact);
};

export const changeContact = async (contactId, contactData) => {
  return Contact.findByIdAndUpdate(contactId, contactData, { new: true });
};

export const deleteLocalFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const deleteContact = (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
