// import { isHttpError } from 'http-errors';
// export const notFoundHandler = (error, _req, res, _next) => {
//   if (isHttpError(error) === true) {
//     return res.status(error.status).json({
//       status: error.status,
//       message: error.message,
//     });
//   }

//   res.status(404).json({
//     status: 404,
//     message: 'Route not found',
//     data: error.message,
//   });
// };

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};
