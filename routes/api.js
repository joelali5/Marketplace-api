const express = require('express');
const apiRouter = express.Router();
const categoriesRouter = require('./categories');

apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
