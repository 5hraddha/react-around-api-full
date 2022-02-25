/**
 * Define all the route handlers related to users on `/users` API endpoint.
 * @module controllers/users
 */
const User = require('../models/user');
const getErrorMsg = require('../utils/getErrorMsg');
const {
  HTTP_SUCCESS_OK,
  HTTP_SUCCESS_CREATED,
  HTTP_CLIENT_ERROR_BAD_REQUEST,
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

/**
 * Route handler for GET request on `/users` API endpoint to get all the users.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response with data - application/json.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res
      .status(HTTP_SUCCESS_OK)
      .send(users))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - Users not found` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
      }
    });
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
const getUserProfile = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - User ID not found` });
      } else if (err.name === 'CastError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: `${err.name} - Invalid User ID passed for searching a user` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
      }
    });
};

/**
 * Route handler for POST request on `/users` API endpoint to create a specific user profile.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `201` - success created response - application/json.
 * @return {Object} `400` - Invalid User data passed for creating a user.
 * @return {Object} `500` - Internal server error response.
 */
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res
      .status(HTTP_SUCCESS_CREATED)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: getErrorMsg(err) });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
      }
    });
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
    currentUser,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - User not found` });
      } else if (err.name === 'ValidationError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: getErrorMsg(err) });
      } else if (err.name === 'CastError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: `${err.name} - Invalid User ID passed for updation` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
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
    currentUser,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res
      .status(HTTP_SUCCESS_OK)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - User not found` });
      } else if (err.name === 'ValidationError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: getErrorMsg(err) });
      } else if (err.name === 'CastError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: `${err.name} - Invalid avatar link passed for updation` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
      }
    });
};

module.exports = {
  getUsers,
  getUserProfile,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
