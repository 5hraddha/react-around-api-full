const HTTP_CLIENT_ERROR_FORBIDDEN = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CLIENT_ERROR_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
