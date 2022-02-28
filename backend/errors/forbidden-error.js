const { HTTP_CLIENT_ERROR_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_CLIENT_ERROR_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
