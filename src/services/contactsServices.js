import { Contact } from '../db/models/contactModel.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.type) {
    contactQuery.where('contactType').eq(filter.type);
  }

  if (filter.isFavorite) {
    contactQuery.where('isFavorite').eq(filter.isFavorite);
  }

  const [contacts, totalItems] = await Promise.all([
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    Contact.countDocuments(contactQuery),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: [contacts],
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage: totalPages - page > 0,
      hasNextPage: page > 1,
    },
  };
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
