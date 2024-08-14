// import Joi from 'joi';

// export const contactValidSchema = Joi.object({
//   userId: Joi.string().required(),
//   name: Joi.string().min(3).max(20).required().messages({
//     'string.base': 'Name should be a string',
//     'string.min': 'Name should be at least {#limit}',
//     'string.max': 'Name should be at most {#limit}',
//   }),

//   email: Joi.string().email().required().messages({
//     'any.required': 'Email is required',
//   }),

//   phoneNumber: Joi.string().min(3).max(20).required().messages({
//     'any.required': 'Phone number is required',
//   }),

//   isFavourite: Joi.boolean(),

//   contactType: Joi.string()
//     .valid('work', 'home', 'personal')
//     .required()
//     .messages({
//       'any.required': 'Type is required',
//     }),
//   // photo: Joi.string()
//   //   .regex(/\.(jpg|jpeg|png)$/)
//   //   .message('Photo must be in jpg, jpeg, or png format')
//   //   .uri()
//   //   .optional(),

//   photo: Joi.string().optional(),
// });

import Joi from 'joi';

const contactValidSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string(),
  photoUrl: Joi.string(),
});

export default contactValidSchema;
