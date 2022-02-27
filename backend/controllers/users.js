/**
 * Define all the route handlers related to users on `/users` API endpoint.
 * @module controllers/users
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  HTTP_SUCCESS_OK,
  HTTP_SUCCESS_CREATED,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');

/**
 * Route handler for GET request on `/users` API endpoint to get all the users.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response with data - application/json.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('List of users not found'))
    .then((users) => res
      .status(HTTP_SUCCESS_OK)
      .send(users))
    .catch(next);
};

/**
 * Route handler for GET request on `/users/:userId` API endpoint to get a specific user profile.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid User ID passed for searching a user.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const getUserProfile = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid User ID passed for searching a user'));
      } else {
        next(err);
      }
    });
};

/**
 * Route handler for GET request on `/users/me` API endpoint to get current user profile.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const getCurrentUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send(user))
    .catch(next);
};

/**
 * Route handler for POST request on `/users` API endpoint to create a specific user profile.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `201` - success created response - application/json.
 * @return {Object} `400` - Invalid User data passed for creating a user.
 * @return {Object} `409` - Email ID already exists.
 * @return {Object} `500` - Internal server error response.
 */
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email ID already exists. Try a different one.');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res
            .status(HTTP_SUCCESS_CREATED)
            .send({
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
            });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Missing or Invalid email or password'));
          }
        });
    })
    .catch(next);
};

/**
 * Route handler for POST request on `/signin` API endpoint for user login.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success created response - application/json.
 * @return {Object} `401` - Unauthorized Error.
 * @return {Object} `500` - Internal server error response.
 */
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Invalid email or password');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

/**
 * Route handler for PATCH request on `/users/me` API endpoint to update the current user profile.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid User data passed for updating the user profile.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const updateUserProfile = (req, res) => {
  const currentUser = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    { _id: currentUser },
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid Title or Subtitle'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Invalid User ID'));
      } else {
        next(err);
      }
    });
};

/**
 * Route handler for PATCH request on `/users/me/avatar` API endpoint to update the user avatar.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid link passed for updating the user avatar.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const updateUserAvatar = (req, res) => {
  const currentUser = req.user._id;
  const { avatar } = req.body;

  User.findOneAndUpdate(
    { _id: currentUser },
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid Avatar Link'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Invalid User ID'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserProfile,
  getCurrentUserProfile,
  createUser,
  loginUser,
  updateUserProfile,
  updateUserAvatar,
};
