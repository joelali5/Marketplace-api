const express = require('express');
const { getCategories } = require('../controllers/categories');
const { withErrorHandling } = require('../controllers/errors');
const categoriesRouter = express.Router();

categoriesRouter.route('/').get(withErrorHandling(getCategories));

module.exports = categoriesRouter;
