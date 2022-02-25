/**
 * Create all the routes related to cards on `/cards` API endpoint.
 * @module routes/cards
 */
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

/**
 * GET /cards
 * @summary - Get JSON list of all the cards.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `500` - Internal server error response.
 */
router.get('/', getCards);

/**
 * POST /cards
 * @summary - Create a new card.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `201` - success created response - application/json.
 * @return {Object} `400` - Invalid Card data passed for creating a card.
 * @return {Object} `500` - Internal server error response.
 */
router.post('/', createCard);

/**
 * DELETE /cards/:cardId
 * @summary - Delete a card by the given ID.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid Card ID passed for deleting a card.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.delete('/:cardId', deleteCard);

/**
 * PUT /cards/:cardId/likes
 * @summary - Update a card by liking it.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid Card ID passed for liking a card.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.put('/:cardId/likes', likeCard);

/**
 * DELETE /cards/:cardId/likes
 * @summary - Delete a like on the card.
 * @param {String} route - Route to serve.
 * @param {Function} routeHandler - A callback to handle the route.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid Card ID passed for disliking a card.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
