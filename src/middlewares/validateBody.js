import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        console.error(
          'Validation Errors:',
          error.details.map((err) => err.message).join(', '),
        );
        return res.status(400).json({
          status: 400,
          message: error.details.map((err) => err.message).join(', '),
        });
      }
      next();
    } catch (error) {
      console.error('Validation error:', error);
      next(
        createHttpError(400, 'Error validating request body', { cause: error }),
      );
    }
  };
};
