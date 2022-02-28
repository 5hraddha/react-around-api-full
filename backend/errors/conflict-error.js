const { HTTP_CLIENT_ERROR_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_CLIENT_ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
