import { isHttpError } from 'http-errors';
export const notFoundHandler = (error, _req, res, _next) => {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
  }

  res.status(404).send({
    status: 404,
    message: 'Route not found',
    data: error.message,
  });
};
