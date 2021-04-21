const db = require('../db/connection');

exports.selectBasketByUsername = async (username) => {
  return db
    .select('items.*')
    .from('baskets')
    .leftJoin('items', 'items.item_id', '=', 'baskets.item_id')
    .where('baskets.username', username);
};
