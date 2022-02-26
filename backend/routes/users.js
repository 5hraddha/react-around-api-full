/**
 * Create all the routes related to cards on `/users` API endpoint.
 * @module routes/users
 */
const router = require('express').Router();
const {
  validateObjectId,
  validateUser,
} = require('../middlewares/validations');
const {
  getUsers,
  getUserProfile,
  createUser,
  updateUserProfile,
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
router.get('/', getUsers);

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
router.get('/:userId', validateObjectId, getUserProfile);

/**
 * POST /users
 * @summary - Create a specific user profile.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `201` - success created response - application/json.
 * @return {Object} `400` - Invalid User ID passed for creating a user.
 * @return {Object} `500` - Internal server error response.
 */
router.post('/', validateUser, createUser);

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
router.patch('/me', updateUserProfile);

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
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
