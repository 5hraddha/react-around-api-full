/**
 * Define all the data validation middlewares to validate input data before any controller runs
 * @module middlewares/validations
 */
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;


const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('The URL is not valid');
}

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message('The email is not valid');
}

/**
 * Middleware for validating object ID passed in the request params
 */
const validateObjectId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if(ObjectId.isValid(value)){
        return value;
      }
      return helpers.message('Invalid User ID');
    }),
  }),
});

/**
 * Middleware for validating user
 */
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The name field needs at least 2 characters',
      'string.max': 'The maximum length of the name field is 30 characters',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'The about field needs at least two characters',
      'string.max': 'The maximum length of the about field is 30 characters',
    }),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().min(8).required().messages({
      'string.min': 'The name field needs at least 8 characters',
    }),
  }),
});

/**
 * Middleware for validating card
 */


/**
 * Middleware for validating login
 */

module.exports = {
  validateObjectId,
  validateUser,
};