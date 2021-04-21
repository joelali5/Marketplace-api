const db = require('../db/connection');

exports.selectUsers = async () => {
  return db('users').select('*');
};

exports.insertUser = async (newUser) => {
  const [insertedUser] = await db('users').insert(newUser).returning('*');
  return insertedUser;
};

exports.selectUserByUsername = async (username) => {
  return db
    .with('users_basket', (query) => {
      return query
        .select('username')
        .count('basket_id')
        .from('baskets')
        .where('username', username)
        .groupBy('baskets.username');
    })
    .with('users_orders', (query) => {
      return query
        .select('username')
        .count('order_id')
        .from('orders')
        .where('username', username)
        .groupBy('orders.username');
    })
    .select(
      'users.*',
      db.raw('COALESCE(users_basket.count, 0)::float AS items_in_basket'),
      db.raw('COALESCE(users_orders.count, 0)::float AS items_ordered')
    )
    .from('users')
    .leftJoin('users_basket', 'users.username', '=', 'users_basket.username')
    .leftJoin('users_orders', 'users.username', '=', 'users_orders.username')
    .where('users.username', username)
    .first();
};
