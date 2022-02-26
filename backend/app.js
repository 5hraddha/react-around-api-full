// All the imports
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const rateLimiter = require('./middlewares/rateLimiter');
const { validateUser } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const { HTTP_CLIENT_ERROR_NOT_FOUND } = require('./utils/constants');
const {
  createUser,
  loginUser,
} = require('./controllers/users');
require('dotenv').config();

const { DB_CONNECTION_URL, PORT = 3000 } = process.env;
const app = express();

// Connect to the MongoDB server
mongoose.connect(DB_CONNECTION_URL);

// Add all the middlewares
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(rateLimiter);

app.post('/signin', loginUser);
app.post('/signup', validateUser, createUser);

// Add all routes
app.use(auth);
require('./routes')(app);

app.use(errors());

app.use((req, res) => res
  .status(HTTP_CLIENT_ERROR_NOT_FOUND)
  .send({ message: 'Requested resource not found' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
