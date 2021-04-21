const db = require('../db/connection');

exports.selectItems = async () => {
  return db('items')
    .select('*')
    .where('item_id', 'NOT IN', db('orders').select('item_id'))
    .orderBy('item_name', 'asc');
};
