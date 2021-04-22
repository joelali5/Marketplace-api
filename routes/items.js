const express = require('express');
const { withErrorHandling } = require('../controllers/errors');
const { getItems, postItem, getItemById } = require('../controllers/items');
const itemsRouter = express.Router();

itemsRouter
  .route('/')
  .get(withErrorHandling(getItems))
  .post(withErrorHandling(postItem));

itemsRouter.route('/:item_id').get(withErrorHandling(getItemById));

module.exports = itemsRouter;
