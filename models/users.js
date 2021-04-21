const db = require('../db/connection');

exports.selectUsers = async () => {
  return db('users').select('*');
};

exports.insertUser = async (newUser) => {
  const [insertedUser] = await db('users').insert(newUser).returning('*');
  return insertedUser;
};
