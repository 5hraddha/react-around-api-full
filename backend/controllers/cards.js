/**
 * Define all the route handlers related to cards on `/cards` API endpoint.
 * @module controllers/cards
 */
const Card = require('../models/card');
const {
  HTTP_SUCCESS_OK,
  HTTP_SUCCESS_CREATED,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');

const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

/**
 * Route handler for GET request on `/cards` API endpoint to get all the cards.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response with data - application/json.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('List of cards not found'))
    .then((cards) => res
      .status(HTTP_SUCCESS_OK)
      .send(cards))
    .catch(next);
};

/**
 * Route handler for POST request on `/cards` API endpoint to create a new card.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `201` - success created response - application/json.
 * @return {Object} `400` - Invalid Card data passed for creating a card.
 * @return {Object} `500` - Internal server error response.
 */
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res
      .status(HTTP_SUCCESS_CREATED)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Missing or Invalid name or link'));
      } else {
        next(err);
      }
    });
};

/**
 * Route handler for DELETE request on `/cards/:cardId` API endpoint to delete a card.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid Card ID passed for deleting a card.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById({ _id: cardId })
    .orFail(new NotFoundError('Card not found'))
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        throw new ForbiddenError('No permission to delete');
      }
      Card.findByIdAndRemove({ _id: cardId })
        .orFail(new NotFoundError('Card not found'))
        .then((cardDeleted) => res
          .status(HTTP_SUCCESS_OK)
          .send(cardDeleted))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid Card ID'));
      } else {
        next(err);
      }
    });
};

/**
 * Route handler for PUT request on `/cards/:cardId/likes` API endpoint to like a card.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid Card ID passed for liking a card.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const likeCard = (req, res, next) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    { _id: cardId },
    { $addToSet: { likes: currentUser } },
    { new: true },
  )
    .orFail(new NotFoundError('Card not found'))
    .then((card) => res
      .status(HTTP_SUCCESS_OK)
      .send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid Card ID'));
      } else {
        next(err);
      }
    });
};

/**
 * Route handler for DELETE request on `/cards/:cardId/likes` API endpoint to unlike a card.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response - application/json.
 * @return {Object} `400` - Invalid Card ID passed for disliking a card.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const dislikeCard = (req, res, next) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: currentUser } },
    { new: true },
  )
    .orFail(new NotFoundError('Card not found'))
    .then((card) => res
      .status(HTTP_SUCCESS_OK)
      .send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid Card ID'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
