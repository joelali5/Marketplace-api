const express = require('express');
const apiRouter = express.Router();
const categoriesRouter = require('./categories');
const itemsRouter = require('./items');
const usersRouter = require('./users');

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/items', itemsRouter);

module.exports = apiRouter;
