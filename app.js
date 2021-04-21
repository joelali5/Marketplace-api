const { NODE_ENV = 'dev' } = process.env;
require('dotenv').config({ path: `./${NODE_ENV}.env` });
const express = require('express');
const app = express();
const apiRouter = require('./routes/api.js');
const {
  handleCustomErrors,
  handleInternalErrors,
} = require('./controllers/errors');

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404, msg: 'Route not found' });
});

app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;
