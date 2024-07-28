import mongoose from 'mongoose';
import createHttpError from 'http-errors';

const { isValidObjectId } = mongoose;

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(500, 'Invalid ID format'));
  }

  next();
};
