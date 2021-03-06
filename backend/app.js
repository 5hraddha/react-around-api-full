// All the imports
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const rateLimiter = require('./middlewares/rate-limiter');
const errorHandler = require('./middlewares/error-handler');
const { validateUser, validateLogin } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  createUser,
  loginUser,
} = require('./controllers/users');
require('dotenv').config();

const { DB_CONNECTION_URL, PORT = 3000 } = process.env;
const app = express();
// connect to the MongoDB server
mongoose.connect(DB_CONNECTION_URL);

// add all middlewares
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.json());

// enabling the request logger
app.use(requestLogger);

// enabling server request limiter
app.use(rateLimiter);

// crash test for code review
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', validateLogin, loginUser);
app.post('/signup', validateUser, createUser);

// add all routes
app.use(auth);
require('./routes')(app);

// enabling the error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
