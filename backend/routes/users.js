/**
 * Create all the routes related to cards on `/users` API endpoint.
 * @module routes/users
 */
const router = require('express').Router();
const {
  validateUserId,
  validateRequestAuth,
} = require('../middlewares/validations');
const {
  getUsers,
  getUserProfile,
  updateUserProfile,
  getCurrentUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

/**
 * GET /users
 * @summary - Get JSON list of all the users.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `500` - Internal server error response.
 */
router.get('/', validateRequestAuth, getUsers);

/**
 * GET /users/me
 * @summary - Get the current user profile.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.get('/me', validateRequestAuth, getCurrentUserProfile);

/**
 * GET /users/:userId
 * @summary - Get a specific user profile with an ID.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid User ID passed for searching a user.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.get('/:userId', validateRequestAuth, validateUserId, getUserProfile);

/**
 * PATCH /users/me
 * @summary - Update the current user profile.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid User data passed for updating the user profile.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.patch('/me', validateRequestAuth, updateUserProfile);

/**
 * PATCH /users/me/avatar
 * @summary - Update the current user avatar.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid link passed for updating the user avatar.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.patch('/me/avatar', validateRequestAuth, updateUserAvatar);

module.exports = router;
