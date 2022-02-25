/**
 * Define the rate limiting middleware for the API, using express-rate-limit package
 * @module middlewares/rateLimiter
 */
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'You have exceeded the 100 requests in 15 mins limit!',
});

module.exports = rateLimiter;
