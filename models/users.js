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
        .count('basket_id AS items_in_basket')
        .from('baskets')
        .where('username', username)
        .groupBy('baskets.username');
    })
    .with('users_orders', (query) => {
      return query
        .select('username')
        .count('order_id AS items_ordered')
        .from('orders')
        .where('username', username)
        .groupBy('orders.username');
    })
    .select('users.*', 'items_in_basket', 'items_ordered')
    .from('users')
    .join('users_basket', 'users.username', '=', 'users_basket.username')
    .join('users_orders', 'users.username', '=', 'users_orders.username')
    .where('users.username', username)
    .first();

  // db
  //   .select('users.*', db.select('*').from('baskets'))
  //   .from('users')
  //   // .count('users_order.basket_id AS items_in_basket')
  //   // .count('orders.order_id AS items_ordered')
  //   // .leftJoin('baskets', 'baskets.username', '=', 'users.username')
  //   // .leftJoin('orders', 'orders.username', '=', 'users.username')
  //   // .groupBy('users.username')
  //   .where('users.username', username)
  //   .first()
};
