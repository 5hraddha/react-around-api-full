/**
 * Define the route handler for any route that is not defined in the app.
 * @module controllers/pageNotFound
 */
const NotFoundError = require('../errors/not-found-error');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
}

module.exports = {
  pageNotFound
}