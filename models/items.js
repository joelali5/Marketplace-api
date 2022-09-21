const db = require('../db/connection');

exports.selectItems = async ({
  sort_by = 'item_name',
  order = 'asc',
  category_name,
  limit,
  p,
  search,
  min_price,
  max_price,
}) => {
  return db('items')
    .select('*')
    .where('item_id', 'NOT IN', db('orders').select('item_id'))

    .modify((query) => {
      if (category_name) query.where({ category_name });
      if (limit && p) {
        query.limit(limit);
        query.offset(+limit * (p - 1));
      }
      if (search) {
        query.select(
          db.raw(`SIMILARITY(?, item_name) AS item_name_relevance`, [search])
        );
        query.select(
          db.raw(`SIMILARITY(?, category_name) AS category_name_relevance`, [
            search,
          ])
        );
        query.select(
          db.raw(`SIMILARITY(?, description) AS description_relevance`, [
            search,
          ])
        );
        query.where(
          db.raw(
            `to_tsvector(item_name || ' ' || description || ' ' || category_name) @@ websearch_to_tsquery(?) 
            OR SIMILARITY(?, item_name) > 0.1
            OR SIMILARITY(?, category_name) > 0.1 
            OR SIMILARITY(?, description) > 0.1`,
            [search, search, search, search]
          )
        );
        // apply search ordering before query ordering
        query.orderBy('item_name_relevance', 'DESC');
      }
      query.orderBy(sort_by, order);
      if (min_price) query.where('price', '>=', min_price);
      if (max_price) query.where('price', '<=', max_price);
    });
};

exports.selectItemById = async (item_id) => {
  const item = await db('items').select('*').where('item_id', item_id).first();
  if (!item) return Promise.reject({ status: 404, msg: 'item not found' });
  return item;
};

exports.insertItem = async (newItem) => {
  const [insertedItem] = await db('items').insert(newItem).returning('*');
  return insertedItem;
};

exports.deleteItemById = async (item_id) => {
  const delCount = await db('items').where('item_id', item_id).del();
  if (!delCount) return Promise.reject({ status: 404, msg: 'item not found' });
  return true;
};
