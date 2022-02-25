/**
 * Define all the route handlers related to cards on `/cards` API endpoint.
 * @module controllers/cards
 */
const Card = require('../models/card');
const getErrorMsg = require('../utils/getErrorMsg');
const {
  HTTP_SUCCESS_OK,
  HTTP_SUCCESS_CREATED,
  HTTP_CLIENT_ERROR_BAD_REQUEST,
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

/**
 * Route handler for GET request on `/cards` API endpoint to get all the cards.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `200` - success response with data - application/json.
 * @return {Object} `404` - The server can not find the requested resource.
 * @return {Object} `500` - Internal server error response.
 */
const getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res
      .status(HTTP_SUCCESS_OK)
      .send(cards))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - Cards not found` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
      }
    });
};

/**
 * Route handler for POST request on `/cards` API endpoint to create a new card.
 * @param {Object} req - The request object
 * @param {Object} res - The response object.
 * @return {Object} `201` - success created response - application/json.
 * @return {Object} `400` - Invalid Card data passed for creating a card.
 * @return {Object} `500` - Internal server error response.
 */
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res
      .status(HTTP_SUCCESS_CREATED)
      .send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: getErrorMsg(err) });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
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
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => res
      .status(HTTP_SUCCESS_OK)
      .send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - Card not found` });
      } else if (err.name === 'CastError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: `${err.name} - Invalid Card ID passed for deleting a card` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
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
const likeCard = (req, res) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: currentUser } },
    { new: true },
  )
    .orFail()
    .then((card) => res
      .status(HTTP_SUCCESS_OK)
      .send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - Card not found` });
      } else if (err.name === 'CastError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: `${err.name} - Invalid Card ID passed for liking a card` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
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
const dislikeCard = (req, res) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: currentUser } },
    { new: true },
  )
    .orFail()
    .then((card) => res
      .status(HTTP_SUCCESS_OK)
      .send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: `${err.name} - Card not found` });
      } else if (err.name === 'CastError') {
        res
          .status(HTTP_CLIENT_ERROR_BAD_REQUEST)
          .send({ message: `${err.name} - Invalid Card ID passed for disliking a card` });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: `${err.name} - An error has occurred on the server` });
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
