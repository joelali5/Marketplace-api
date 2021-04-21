const {
  selectUsers,
  insertUser,
  selectUserByUsername,
} = require('../models/users');
const schemas = require('../schemas');

exports.getUsers = async (req, res, next) => {
  const users = await selectUsers();
  res.send({ users });
};

exports.postUser = async (req, res, next) => {
  const newUser = req.body;
  await schemas.newUser.validate(newUser);
  const user = await insertUser(newUser);
  res.status(201).send({ user });
};

exports.getUserByUsername = async (req, res, next) => {
  const user = await selectUserByUsername(req.params.username);
  res.send({ user });
};
