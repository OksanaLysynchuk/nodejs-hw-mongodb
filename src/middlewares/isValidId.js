import createHttpError from 'http-errors';
import validId from 'mongoose';
const { isValidObjectId } = validId;

export const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createHttpError(400, 'ID is not valid'));
  }

  next();
};
