const express = require('express');
const { withErrorHandling } = require('../controllers/errors');
const { getUsers } = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.route('/').get(withErrorHandling(getUsers));

module.exports = usersRouter;
