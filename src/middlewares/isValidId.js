// import createHttpError from 'http-errors';
// import validId from 'mongoose';
// const { isValidObjectId } = validId;

// export const isValidId = (req, res, next) => {
//   const { id } = req.params;

//   if (isValidObjectId(id) === false) {
//     return next(createHttpError(400, 'ID is not valid'));
//   }

//   next();
// };

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
