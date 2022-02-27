const HTTP_CLIENT_ERROR_CONFLICT = require('../utils/constants');
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CLIENT_ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
