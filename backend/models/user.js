/**
 * Data layer for a user
 * @module models/user
 */
const mongoose = require('mongoose');
const validator = require('validator');

/**
 * User schema. Contains all the users related fields: name, about and avatar
 * @constructor user
 */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: [true, 'User information is required'],
    trim: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: [true, 'A link to the user avatar is required'],
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: validator.isURL,
      message: 'The entered link to the avatar is badly formed or contains invalid characters',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'The entered email is badly formed or contains invalid characters',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  }
});

module.exports = mongoose.model('user', userSchema);
