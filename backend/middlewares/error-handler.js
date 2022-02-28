/**
 * Handles all the errors across the application
 * @module middlewares/error-handler
 */

const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .send({
      message: status === 500
        ? 'An error occurred on the server'
        : message,
    });
};

module.exports = errorHandler;
