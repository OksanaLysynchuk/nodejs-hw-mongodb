import { Contact } from '../db/models/contactModel.js';

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

  if (filter.isFavorite) {
    contactQuery.where('isFavorite').eq(filter.isFavorite);
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
  return Contact.create(contact);
};

export const changeContact = (contactId, patchedContact, userId) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    { photoUrl: photo },
    patchedContact,
    {
      new: true,
    },
  );
};

export const deleteContact = (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
