/**
 * Map all the routers to their respective main routes.
 * @module routes/index.js
 */
const userRouter = require('./users');
const cardRouter = require('./cards');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/cards', cardRouter);
};
