/**
 * Handles all the errors across the application
 * @module middlewares/error-handler
 */
const HTTP_INTERNAL_SERVER_ERROR = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = HTTP_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_INTERNAL_SERVER_ERROR
        ? 'An error occurred on the server'
        : message,
    });
};

module.exports = errorHandler;
