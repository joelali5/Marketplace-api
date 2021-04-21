const express = require('express');
const { withErrorHandling } = require('../controllers/errors');
const { getItems } = require('../controllers/items');
const itemsRouter = express.Router();

itemsRouter.route('/').get(withErrorHandling(getItems));

module.exports = itemsRouter;
