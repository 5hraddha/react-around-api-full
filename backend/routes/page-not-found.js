/**
 * Create the 'Requested Resource Not Found' route for any route that is not defined in the app.
 * @module routes/pageNotFound
 */
const router = require('express').Router();
const { pageNotFound } = require('../controllers/page-not-found');

router.get('/', pageNotFound);

module.exports = router;
