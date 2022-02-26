/**
 * Verify the token from the headers and decide to authorize the user accordingly
 * @module middlewares/auth
 */
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key');
  } catch(err) {
      return res
        .status(401)
        .send({ message: 'Authorization Required' });
  }

  req.user = payload;

  next();
}

module.exports = auth;