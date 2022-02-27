const HTTP_CLIENT_ERROR_BAD_REQUEST = require('../utils/constants');
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CLIENT_ERROR_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
