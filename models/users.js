const db = require('../db/connection');

exports.selectUsers = async () => {
  return db('users').select('*');
};

exports.insertUser = async (newUser) => {
  const [insertedUser] = await db('users').insert(newUser).returning('*');
  return insertedUser;
};

exports.selectUserByUsername = async (username) => {
  return db('users')
    .select('users.*')
    .count('baskets.basket_id AS items_in_basket')
    .leftJoin('baskets', 'baskets.username', '=', 'users.username')
    .groupBy('users.username')
    .where('users.username', username)
    .first();
};
