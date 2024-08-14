// import createHttpError from 'http-errors';

// export const validateBody = (schema) => {
//   return async (req, res, next) => {
//     try {
//       await schema.validateAsync(req.body, { abortEarly: false });

//       next();
//     } catch (error) {
//       console.log({ message: error.message });
//       console.log({ details: error.details });

//       next(
//         createHttpError(
//           400,
//           error.details.map((err) => err.message).join(', '),
//         ),
//       );
//     }
//   };
// };

import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      // Виконуємо валідацію з опцією abortEarly: false для повернення всіх помилок
      await schema.validateAsync(req.body, { abortEarly: false });

      // Якщо валідація пройшла успішно, переходимо до наступного мідлвара
      next();
    } catch (error) {
      // Логування помилок для налагодження
      console.error('Validation error:', error);

      // Формування повідомлення про помилку
      const errorMessage = error.details.map((err) => err.message).join(', ');

      // Перенаправлення помилки на глобальний обробник помилок
      next(createHttpError(400, errorMessage));
    }
  };
};
