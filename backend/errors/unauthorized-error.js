const { HTTP_CLIENT_ERROR_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_CLIENT_ERROR_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
