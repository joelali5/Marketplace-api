const express = require('express');
const { withErrorHandling } = require('../controllers/errors');
const {
  getUsers,
  postUser,
  getUserByUsername,
} = require('../controllers/users');
const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(withErrorHandling(getUsers))
  .post(withErrorHandling(postUser));

usersRouter.route('/:username').get(withErrorHandling(getUserByUsername));

module.exports = usersRouter;
