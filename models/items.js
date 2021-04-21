const db = require('../db/connection');

exports.selectItems = async ({
  sort_by = 'item_name',
  order = 'asc',
  category_name,
  limit,
  p,
}) => {
  return db('items')
    .select('*')
    .where('item_id', 'NOT IN', db('orders').select('item_id'))
    .orderBy(sort_by, order)
    .modify((query) => {
      if (category_name) query.where({ category_name });
      if (limit && p) {
        query.limit(limit);
        query.offset(+limit * (p - 1));
      }
    });
};

exports.insertItem = async (newItem) => {
  const [insertedItem] = await db('items').insert(newItem).returning('*');
  return insertedItem;
};
