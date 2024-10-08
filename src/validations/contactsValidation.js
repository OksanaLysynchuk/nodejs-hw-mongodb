import Joi from 'joi';

export const contactValidSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
  }),

  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),

  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Phone number is required',
  }),

  isFavourite: Joi.boolean(),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.required': 'Type is required',
    }),

  photo: Joi.string(),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().optional(),
  photo: Joi.string().optional(),
}).min(1);
