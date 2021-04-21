const db = require('../db/connection');

exports.selectOrdersByUsername = async (username) => {
  return db
    .select('items.*')
    .from('orders')
    .leftJoin('items', 'items.item_id', '=', 'orders.item_id')
    .where('orders.username', username);
};
