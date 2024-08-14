// import { isHttpError } from 'http-errors';
// export const errorHandler = (error, _req, res, _next) => {
//   if (isHttpError(error) === true) {
//     return res.status(error.status).json({
//       status: error.status,
//       message: error.message,
//     });
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: error.message,
//   });
// };

// src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
