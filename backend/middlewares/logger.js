/**
 * Logs all the requests to the API and information about the errors encountered
 * @module middlewares/error-handler
 */
const winston = require('winston');
const expressWinston = require('express-winston');

// create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/request.log' }),
  ],
  format: winston.format.json(),
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
