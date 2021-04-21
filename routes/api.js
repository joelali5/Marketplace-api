const express = require('express');
const apiRouter = express.Router();
const categoriesRouter = require('./categories');
const usersRouter = require('./users');

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
