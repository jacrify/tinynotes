const Joi = require('joi');

// User registration validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    })
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Snippet creation validation schema
const snippetSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.max': 'Title cannot be more than 100 characters',
      'any.required': 'Title is required'
    }),
  content: Joi.string()
    .required()
    .messages({
      'any.required': 'Content is required'
    }),
  isPublic: Joi.boolean()
    .default(false)
});

module.exports = {
  registerSchema,
  loginSchema,
  snippetSchema
};
