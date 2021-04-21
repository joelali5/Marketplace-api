const express = require('express');
const { withErrorHandling } = require('../controllers/errors');
const { getUsers, postUser } = require('../controllers/users');
const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(withErrorHandling(getUsers))
  .post(withErrorHandling(postUser));

module.exports = usersRouter;
