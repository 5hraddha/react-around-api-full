const HTTP_CLIENT_ERROR_NOT_FOUND = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CLIENT_ERROR_NOT_FOUND;
  }
}

module.exports = NotFoundError;
