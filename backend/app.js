// All the imports
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimiter = require('./middlewares/rateLimiter');
const { HTTP_CLIENT_ERROR_NOT_FOUND } = require('./utils/constants');
require('dotenv').config();

const { DB_CONNECTION_URL, PORT = 3000 } = process.env;
const app = express();

// Connect to the MongoDB server
mongoose.connect(DB_CONNECTION_URL);

// Add all the middlewares
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
app.use((req, res, next) => {
  req.user = {
    _id: '61eb9fb427053e8816df1826',
  };
  next();
});

// Add all routes
require('./routes')(app);

app.use((req, res) => res
  .status(HTTP_CLIENT_ERROR_NOT_FOUND)
  .send({ message: 'Requested resource not found' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
